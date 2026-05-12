# step 1 frontend
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

# step 2 backend
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend-build
WORKDIR /src
COPY backend/chatAppWebApi/*.csproj ./chatAppWebApi/
RUN dotnet restore ./chatAppWebApi/chatAppWebApi.csproj
COPY backend/chatAppWebApi ./chatAppWebApi
COPY --from=frontend-build /frontend/dist ./chatAppWebApi/wwwroot
RUN dotnet publish ./chatAppWebApi/chatAppWebApi.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

# step 3 runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=backend-build /app/publish .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "chatAppWebApi.dll"]