# Rabbit Chat

A real-time chat application with JWT/refresh token authentication that has a single room built with React JS, .NET C#, Neon Postgres, Azure, Docker, and GitHub Actions. 

[](https://github.com/CharlesCarMichaelLutz/Chat_App#rabbit-chat)

#### start chatting [here](https://rabbit-chat.azurewebsites.net/)


[](https://github.com/CharlesCarMichaelLutz/Chat_App#start-chatting-here)


<img width="1024" height="768" alt="rc1" src="https://github.com/user-attachments/assets/9b4e8f78-f5e9-4aee-b34c-9e6d6e640bb6" />

<img width="1024" height="768" alt="rc2" src="https://github.com/user-attachments/assets/bd2913bf-7918-445b-9af6-1f3ce1fdcc5a" />

---

## Summary

[](https://github.com/CharlesCarMichaelLutz/Chat_App#summary)

Charles set out to build the Rabbit Chat application, determined to connect all the pieces together. The ability to connect the dots from client, server, and database—tying it all together with a CI/CD pipeline using GitHub Actions, containerized with Docker, and hosted on Microsoft Azure—made it a fulfilling and educational process. The beauty of how data flows seamlessly across all layers is both engineering and an artistic endeavor. Several key concepts were mastered that provided a solid foundation for this project.

First, implementing the correct data flow where the React client loads the chatroom, saves the data in state, and establishes a WebSocket connection with SignalR was particularly enlightening. The system sends HTTP requests from the client, while the server broadcasts responses to all connected clients—a pattern that was both fun to learn and internalize.

Second, implementing JSON Web Token with Refresh Token for authentication enhanced the application's security. The system seamlessly retries requests under the hood when authentication expires, resulting in a smoother user experience.

Overall, building Rabbit Chat was an incredibly rewarding experience that demonstrated the power of modern web technologies working in harmony.



### Author

[](https://github.com/CharlesCarMichaelLutz/Chat_App#author)

- **Charles Lutz** - _Full-Stack Software Developer_ - [Personal Website](https://charlescarmichaellutz.github.io/) | [LinkedIn](https://www.linkedin.com/in/CharlesCarMichaelLutz)
