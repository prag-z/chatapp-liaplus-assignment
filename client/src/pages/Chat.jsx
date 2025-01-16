import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { io } from "socket.io-client"
import { allUsersRoute, host } from "../utils/APIRoutes"
import ChatContainer from "../components/ChatContainer"
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome"

export default function Chat() {
  const navigate = useNavigate()
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login")
      } else {
        setCurrentUser(
          JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        )
      }
    }
    fetchCurrentUser()
  }, [navigate])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host)
      socket.current.emit("add-user", currentUser._id)
    }
  }, [currentUser])

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        setContacts(data.data)
      }
    }
    fetchContacts()
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#1e1f22]">
      <div className="h-[85vh] w-[85vw] bg-[#2b2d31] rounded-2xl overflow-hidden flex">
        <div className="w-80 flex-shrink-0">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
        </div>

        <div className="flex-1">
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </div>
  )
}

