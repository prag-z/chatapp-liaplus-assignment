import React, { useState, useEffect, useRef } from "react"
import ChatInput from "./ChatInput"
import Logout from "./Logout"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes"

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([])
  const scrollRef = useRef()
  const [arrivalMessage, setArrivalMessage] = useState(null)

  useEffect(() => {
    const fetchMessages = async () => {
      const data = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      })
      setMessages(response.data)
    }

    fetchMessages()
  }, [currentChat])

  const handleSendMsg = async (msg) => {
    const data = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    })
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    })

    setMessages((prevMessages) => [
      ...prevMessages,
      { fromSelf: true, message: msg },
    ])
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg })
      })
    }
  }, [socket])

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage])
    }
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-full w-full bg-[#313338]">
      {/* Chat Header */}
      <div className="h-12 px-4 flex bg-[#383a40] items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {currentChat.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="text-white font-medium">{currentChat.username}</h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <div
            key={uuidv4()}
            ref={scrollRef}
            className={`flex ${message.fromSelf ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg text-[0.9375rem] ${
                message.fromSelf
                  ? "bg-[#5865f2] text-white"
                  : "bg-[#383a40] text-[#dbdee1]"
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  )
}

