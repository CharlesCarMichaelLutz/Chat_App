import React from 'react'
//import {Link} from 'react-router-dom'
import '../styling/ChatroomPage.css'

function ChatroomPage() {
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
          <li className='create--message'>
            <span className='username'>User A:</span>
            <span className='content'>Greetings everyone!</span>
          </li>
          <li className='create--message'>
            <span className='username'>User B:</span>
            <span className='content'>Welcome User A!</span>
          </li>
          <li className='create--message'>
            <span className='username'>User D:</span>
            <span className='content'>Let's have a great summer</span>
          </li>
          <li className='create--message'>
            <span className='username'>User C:</span>
            <span className='content'>I am looking forward to a good one</span>
          </li>
          <li className='create--message'>
            <span className='username'>User B:</span>
            <span className='content'>I would like to visit the beach soon</span>
          </li>
          <li className='create--message'>
            <span className='username'>User B:</span>
            <span className='content'>And I won't forget to bring sunscreen</span>
          </li>
          <li className='create--message'>
            <span className='username'>User D:</span>
            <span className='content'>That's agreed User B</span>
          </li>
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