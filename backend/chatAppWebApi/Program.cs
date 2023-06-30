using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var services = builder.Services;
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

//enable CORS
services.AddCors(options => 
{
    options.AddPolicy("ReactAppPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader();     
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(create =>
    {
        create.SwaggerEndpoint("/swagger/v1/swagger.json", "Rabbit Chat API V1");
    });
}


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("ReactAppPolicy");

//app.MapGet("/", async (HttpContext context) => 
//{
//    //var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
//    //await context.Response.SendFileAsync(filePath);
//});

app.Run(async (context) =>
{
    context.Response.ContentType = "text/html";
    await context.Response.SendFileAsync(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"));
});

////GET all messages
//app.MapGet("/api/messages", async (ChatroomDb db) =>
//{
//    var result = await //something 
//    return Results.Ok(result);
//});

////POST a message
//app.MapPost("/api/messages", async (ChatroomDb db) =>
//{
//   //some different logic
//});

////GET all users
//app.MapGet("/api/users", async (ChatroomDb db) =>
//{
//    var result = await //something 
//    return Results.Ok(result);
//});

////POST a user
//app.MapPost("/api/users", async (ChatroomDb db) =>
//{
//    //some different logic
//});

////GET a single user
//app.MapGet("/api/users/{id}", async (ChatroomDb db) =>
//{
//    var result = await //something
//    return Results.Ok(result);
//});


app.Run();
