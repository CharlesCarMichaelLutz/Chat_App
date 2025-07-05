import React from "react"
import { useState } from "react"
import axios from "axios"

export function RabbitChatBot() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi this is Rabbit-chat-bot, How may I help you?",
    },
  ])

  async function callGetResponse() {
    setIsLoading(true)
    let temp = messages
    temp.push({ role: "user", content: input })
    setMessages(temp)
    setInput("")
    console.log("Calling VeniceAI...")

    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    })

    const data = await res.json()
    const { output } = data
    console.log("VeniceAI replied....", output.content)

    setMessages((previous) => [...previous, output])
    setIsLoading(false)
  }

  const Submit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      callGetResponse()
    }
  }
  return (
    <>
      <section className="page">
        <h1>Rabbit-Chat-Bot</h1>
        <div>
          <div className="title">
            {messages.map((msg) => {
              return <div key={msg.content}>{msg.content}</div>
            })}
            {isLoading ? <div>...Loading</div> : ""}
          </div>
          <div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={Submit}
            />
            <button onClick={callGetResponse}>Send</button>
          </div>
        </div>

        <div></div>
      </section>
    </>
  )
}
