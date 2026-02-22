using chatAppWebApi.Contracts.Requests;
using chatAppWebApi.Database;
using chatAppWebApi.Models;
using chatAppWebApi.Repositories;
using chatAppWebApi.Services;
using chatAppWebApi.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
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

services.AddScoped<IPostgreSqlConnectionFactory>(_ =>
    new PostgreSqlConnectionFactory(config.GetValue<string>("ConnectionStrings:chat_app")));
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
          .AllowCredentials()
          .AllowAnyMethod();
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

app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();

app.UseCors("ReactAppPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(e =>
{
    e.MapPost("/api/users/signup", async (
              IUserService service, [FromBody] UserRequestDto request) =>
    {
        var create = await service.CreateUser(request);
        return Results.Ok(create);
    });

    e.MapPost("/api/users/login", async (
              IUserService service, [FromBody] UserRequestDto request) =>
    {
        var response = await service.LoginUser(request);
        return Results.Ok(response);
    });

    e.MapHub<ChatHub>("/chatHub");

    e.MapFallback(async context =>
    {
        context.Response.ContentType = "text/html";
        await context.Response.SendFileAsync(
            Path.Combine(Directory.GetCurrentDirectory(), 
            "wwwroot", "index.html"
            ));
    });
});

app.Run();

