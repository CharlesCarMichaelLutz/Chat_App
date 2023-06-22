import React from 'react'
//import {Link} from 'react-router-dom'
import '../styling/ChatroomPage.css'

function ChatroomPage() {

  var userA = {
    name: "User A",
    messages: [
      {text:"Greetings everyone!"},
    ]
  }

  var userB = {
    name: "User B",
    messages: [
      {text:"Welcome User A!"},
      {text:"I would like to visit the beach soon"},
      {text: "And I won't forget to bring sunscreen"}
    ]
  }

  var userC = {
    name: "User C",
    messages: [
      {text:"I am looking forward to a good one"},
    ]
  }

  var userD = {
    name: "User D",
    messages: [
      {text:"Let's have a great summer"},
      {text:"That's agreed User B"}
    ]
  }

  const users = [userA, userB, userC, userD]

  const renderMessage = users.flatMap((user, index) => (
    user.messages.flatMap((message, messageIndex) => (
          <li className='create--message' key={`${index}-${messageIndex}`}>
            <span className='username'>{user.name}</span>
            <span className='content'>{message.text}</span>
          </li>
    ))
  ))

  return (
    <div className='chatroomPage--container'>
      <span className='active--users'>
        <h2>Active Now</h2>
        <ul>
          <li>User A</li>
          <li>User B</li>
          <li>User C</li>
          <li>User D</li>
        </ul>
      </span>

      <span className='chatroom'>
        <ul className='message--container'>
         {renderMessage}
        </ul>
      </span>

      <span className='input--container'>
        <input type='text' placeholder="...enter message here"/>
        <button className='submit--message'>Send</button>
      </span>
    </div>
  )
}

export default ChatroomPage