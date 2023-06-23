import React, {useState} from 'react'
//import {Link} from 'react-router-dom'
import '../styling/ChatroomPage.css'

function ChatroomPage() {
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState([
    {
      name: "User A",
      messages: [
        {text:"Greetings everyone!"},
      ]
    },
    {
      name: "User B",
      messages: [
        {text:"Welcome User A!"},
        {text:"I would like to visit the beach soon"},
        {text: "And I won't forget to bring sunscreen"}
      ]
    },
    {
      name: "User C",
      messages: [
        {text:"I am looking forward to a good one"},
      ]
    },
    {
      name: "User D",
      messages: [
        {text:"Let's have a great summer"},
        {text:"That's agreed User B"}
      ]
    }
  ])

  function handleSendMessage() {
      const createNewMessage = {
        text: message
      }

      const newUser = {
        name: 'Current User',
        messages: [createNewMessage]
      }

      setUsers(prevUsers => [...prevUsers, newUser])
      //figure out the object structure and field
      //that needs to be reset on each render
      setMessage('')
  }

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

      <form className='input--container'onSubmit={(event) => {
          event.preventDefault()
          handleSendMessage()
        }}>
          <input 
            type='text' 
            placeholder="...enter message here" 
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className='submit--message'>Send</button>
      </form>
    </div>
  )
}

export default ChatroomPage