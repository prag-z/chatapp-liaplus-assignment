import React, { useState, useEffect } from "react"

export default function Welcome() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )
    if (userData) {
      setUserName(userData.username)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#313338] text-[#dbdee1]">
      <h1 className="text-4xl font-bold mb-4">
        Welcome, <span className="text-[#5865f2]">{userName}!</span>
      </h1>
      <h3 className="text-lg text-[#949ba4]">
        Please select a chat to start messaging.
      </h3>
    </div>
  )
}

