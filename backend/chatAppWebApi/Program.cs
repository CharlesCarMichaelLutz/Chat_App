using chatAppWebApi.Repositories;
using chatAppWebApi.Services;
using chatAppWebApi.SignalR;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

//services.AddScoped<INpqsqlDataAccess, NpqsqlDataAccess>();
services.AddScoped<IChatroomRepository, ChatroomRepository>();
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

    endpoints.MapHub<ChatHub>("/chatHub");

    endpoints.MapGet("/api/messages", async (IChatroomService chatRoom) =>
    {
        var response = await chatRoom.GetAllMessages();
        return Results.Ok(response);
    });

    endpoints.MapPost("/api/messages", async (IChatroomService chatRoom, string username, string message) =>
    {
        var response = await chatRoom.CreateMessage(username, message);
        return Results.Ok(response);
    });

    endpoints.MapGet("/api/users", async (IChatroomService chatRoom) =>
    {
        var response = await chatRoom.GetAllUsers();
        return Results.Ok(response);
    });

    endpoints.MapPost("/api/users", async (IChatroomService chatRoom, string username) =>
    {
        var response = await chatRoom.CreateUser(username);
        return Results.Ok(response);
    });

    endpoints.MapGet("/api/users/{id}", async (IChatroomService chatRoom, int id) =>
    {
        var response = await chatRoom.GetUser(id);
        return Results.Ok(response);
    });

    endpoints.MapFallback(async context =>
    {
        context.Response.ContentType = "text/html";
        await context.Response.SendFileAsync(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"));
    });
});

app.Run();
