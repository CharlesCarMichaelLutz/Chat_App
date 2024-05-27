using chatAppWebApi.Database;
using chatAppWebApi.Models;
using chatAppWebApi.Repositories;
using chatAppWebApi.Services;
using chatAppWebApi.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;
var services = builder.Services;

services.Configure<JwtCredentials>(config.GetSection("Jwt"));

services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateActor = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = config["Jwt:Issuer"],
        ValidAudience = config["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]))
    };
});

services.AddScoped<IPostgreSqlConnectionFactory>(_ =>
    new PostgreSqlConnectionFactory(config.GetValue<string>("ConnectionStrings:RabbitChatDb")));

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
});

services.AddCors(options => 
{
    options.AddPolicy("ReactAppPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader();     
    });
});

services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(create =>
    {
        create.SwaggerEndpoint("/swagger/v1/swagger.json", "Rabbit Chat API V1");
    });
}

app.UseAuthentication();
app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();

app.UseCors("ReactAppPolicy");

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/chatHub");

    endpoints.MapPost("/api/users/signup", async (IUserService service, UserModel user) =>
    {
        var response = await service.CreateUser(user);
        return Results.Ok(response);
    });

    endpoints.MapPost("/api/users/login", async (IUserService service, UserModel user) =>
    {
        var response = await service.GetUserByUsername(user);
        return Results.Ok(response);
    });

    endpoints.MapGet("/api/users", [Authorize] async (IUserService service) =>
    {
        var response = await service.GetAllUsers();
        return Results.Ok(response);
    });

    endpoints.MapPost("/api/messages", [Authorize] async (IMessageService service, MessageModel message) =>
    {
        var response = await service.CreateMessage(message);
        return Results.Ok(response);
    });

    endpoints.MapGet("/api/messages", [Authorize] async (IMessageService service) =>
    {
        var response = await service.GetAllMessages();
        return Results.Ok(response);
    });

    endpoints.MapFallback(async context =>
    {
        context.Response.ContentType = "text/html";
        await context.Response.SendFileAsync(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"));
    });
});

app.Run();
