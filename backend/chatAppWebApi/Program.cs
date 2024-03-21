using chatAppWebApi.Models;
using chatAppWebApi.Services;
using chatAppWebApi.SignalR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

//services.AddScoped<INpqsqlDataAccess, NpqsqlDataAccess>();
//services.AddScoped<IChatroomRepository, ChatroomRepository>();
services.AddScoped<IChatroomService, ChatroomService>();

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

app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();

app.UseCors("ReactAppPolicy");

app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/api/messages", async (HttpContext httpContext, IChatroomService chatRoom) =>
    {
        var result = await chatRoom.GetAllMessages();
        await httpContext.Response.WriteAsJsonAsync(result);
    });

    endpoints.MapPost("/api/messages", async (HttpContext httpContext, IChatroomService chatRoom, string username, string message) =>
    {
        var result = chatRoom.CreateMessage(username, message);
        await httpContext.Response.WriteAsJsonAsync(result.Result);
    });

    endpoints.MapGet("/api/users", async (HttpContext httpContext, IChatroomService chatRoom) =>
    {
        var result = await chatRoom.GetAllUsers();
        await httpContext.Response.WriteAsJsonAsync(result);
        //return Results.Ok(result);
    });

    endpoints.MapPost("/api/users", async (HttpContext httpContext, IChatroomService chatRoom, string username) =>
    {
        var result = chatRoom.CreateUser(username);
        await httpContext.Response.WriteAsJsonAsync(result.Result);
    });

    endpoints.MapGet("/api/users/{id}", async (HttpContext httpContext, IChatroomService chatRoom, int id) =>
    {
        var result = await chatRoom.GetUser(id);
        await httpContext.Response.WriteAsJsonAsync(result);
        //return Results.Ok(result);
    });

    endpoints.MapHub<ChatHub>("/chatHub");


    endpoints.MapFallback(async context =>
    {
        context.Response.ContentType = "text/html";
        await context.Response.SendFileAsync(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"));
    });
});

app.Run();
