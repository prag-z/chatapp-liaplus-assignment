import React, { useState } from "react"
import { IoMdSend } from "react-icons/io"

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("")

  const sendChat = (event) => {
    event.preventDefault()
    if (msg.length > 0) {
      handleSendMsg(msg)
      setMsg("")
    }
  }

  return (
    <div className="p-4 bg-[#313338]">
      <form
        className="flex items-center gap-4"
        onSubmit={(event) => sendChat(event)}
      >
        <div className="flex-1 bg-[#383a40] rounded-lg px-4 py-2.5">
          <input
            type="text"
            placeholder="Message"
            className="w-full bg-transparent text-[#dbdee1] placeholder-[#949ba4] focus:outline-none"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="p-2 rounded-full bg-[#5865f2] hover:bg-[#4752c4] transition-colors text-white"
        >
          <IoMdSend className="text-xl" />
        </button>
      </form>
    </div>
  )
}

