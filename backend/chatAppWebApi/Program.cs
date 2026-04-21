using chatAppWebApi.Contracts.Requests;
using chatAppWebApi.Database;
using chatAppWebApi.Repositories;
using chatAppWebApi.Services;
using chatAppWebApi.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Net;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;
var services = builder.Services;

services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = config["Jwt:Issuer"],
        ValidAudience = config["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Secret"]!)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
});

services.AddHttpContextAccessor();
services.AddScoped<IPostgreSqlConnectionFactory>(_ =>
    new PostgreSqlConnectionFactory(config.GetValue<string>("ConnectionStrings:chat_app")!));
services.AddScoped<PostgresDBInitializer>();
services.AddSingleton<IPasswordHasher, PasswordHasher>();
services.AddScoped<ITokenService, TokenService>();
services.AddScoped<IUserService, UserService>();
services.AddScoped<IMessageService, MessageService>();
services.AddScoped<IUserRepository, UserRepository>();
services.AddScoped<IMessageRepository, MessageRepository>();

services.AddEndpointsApiExplorer();
services.AddSwaggerGen(create =>
{
    create.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Rabbit Chat",
        Description = "Chat and collaborate as you wish",
        Version = "v1"
    });

    create.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter into field the word 'Bearer' followed by a space and the JWT",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    create.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

services.AddCors(options =>
{
    options.AddPolicy("ReactAppPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials();
    });
});

services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var initializer = scope.ServiceProvider.GetRequiredService<PostgresDBInitializer>();
    await initializer.InitializeAsync();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(create =>
    {
        create.SwaggerEndpoint("/swagger/v1/swagger.json", "Rabbit Chat API V1");
    });
}

//app.UseHttpsRedirection();
app.UseExceptionHandler(appError =>
{
    appError.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";

        var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
        if(contextFeature is not null)
        {
            Console.WriteLine($"Error: {contextFeature.Error}");

            await context.Response.WriteAsJsonAsync(new
            {
                HttpStatusCode = context.Response.StatusCode,
                Message = "Internal Server Error"
            });
        }
    });
});

app.UseRouting();

app.UseCors("ReactAppPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapPost("/signup", async (IUserService service, [FromBody] UserRequest request) =>
{
    var validationResult = UserValidator.Validate(request);

    if (!validationResult.IsValid)
    {
        return Results.BadRequest(validationResult);
    }

    try 
    { 
        var response = await service.CreateUser(request);
        return Results.Ok(response);
    }
    catch(Exception ex)
    {
        return Results.NotFound(ex.Message);
    }
});

app.MapGet("/error", () =>
{
    throw new Exception("An example exception for testing");
});

app.MapPost("/login", async (IUserService service, [FromBody] UserRequest request) =>
{
    try 
    {
        var response = await service.LoginUser(request);
        return Results.Ok(response);
    }
    catch(Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

//app.MapPost("/refresh-token", async (IUserService service) =>
//{
//    var response = await service.CheckAndReplaceToken();
//        return Results.Ok(response);
//});

app.MapPost("/refresh-token", async (IUserService service) =>
{
    try
    {
        var response = await service.CheckAndReplaceToken();
        return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.MapGet("/users", [Authorize] async (IUserService service) =>
{
    var response = await service.GetAllUsers();
    //await hubContext.Clients.All.AddUser(response);
        return Results.Ok(response);
});

app.MapGet("/messages", [Authorize] async (IMessageService service) =>
{
    var response = await service.GetAllMessages();
        return Results.Ok(response);
});

app.MapPost("/messages", [Authorize] async (IMessageService service, IHubContext<ChatHub, IChatHubClient> hubContext, [FromBody] MessageRequest request) =>
{
    try
    {
        var response = await service.SaveMessage(request);
        await hubContext.Clients.All.SendMessage(response);
            return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPatch("/messages", [Authorize] async (IMessageService service, IHubContext<ChatHub, IChatHubClient> hubContext, [FromBody] DeleteRequest request) =>
{
    try
    {
        var response = await service.DeleteMessage(request);
        await hubContext.Clients.All.DeleteMessageById(response);
            return Results.Ok(response);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapHub<ChatHub>("/chatHub");

app.Run();

