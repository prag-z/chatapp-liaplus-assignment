import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import socket from "../utils/socket";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [contactStatuses, setContactStatuses] = useState({}); 

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);

      socket.emit("add-user", data._id);
    };

    fetchUserData();

    socket.on("user-status-changed", ({ userId, isOnline }) => {
      setContactStatuses((prevStatuses) => ({
        ...prevStatuses,
        [userId]: isOnline,
      }));
    });

    socket.on("initial-online-users", (onlineUsers) => {
      const updatedStatuses = {};
      onlineUsers.forEach((userId) => {
        updatedStatuses[userId] = true; 
      });

      setContactStatuses((prevStatuses) => ({
        ...prevStatuses,
        ...updatedStatuses,
      }));
    });

    return () => {
      socket.off("user-status-changed");
      socket.off("initial-online-users");
    };
  }, [socket]);
  

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div className="flex flex-col h-full bg-[#2b2d31] rounded-l-2xl">
      <div className="flex items-center h-12 px-4 py-3 bg-[#232428] rounded-tl-2xl">
        <h3 className="text-xl font-semibold text-white">
          Lia<span className="text-[#5865f2]">Chat</span>
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto py-2 space-y-[2px] scrollbar-thin scrollbar-thumb-[#202225] scrollbar-track-transparent hover:scrollbar-thumb-[#36393f]">
        {contacts.map((contact, index) => (
          <div
            key={contact._id}
            className={`mx-2 px-2 py-2 rounded-xl flex items-center gap-3 cursor-pointer transition-colors
              ${index === currentSelected
                ? "bg-[#404249] text-white"
                : "text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1]"
              }`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">
                {contact.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 truncate">
              <h3 className="font-medium">{contact.username}</h3>
              <span className={`text-xs ${contactStatuses[contact._id] ? "text-green-500" : "text-gray-500"}`}>
                {contactStatuses[contact._id] ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {currentUserName && (
        <div className="h-[52px] bg-[#232428] px-2 flex items-center rounded-bl-2xl">
          <div className="flex items-center gap-4 bg-[#232428] rounded-xl p-1 flex-1">
            <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {currentUserName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate">{currentUserName}</div>
              <div className="text-xs text-[#949ba4]">Online</div>
            </div>
            <div>
              <Logout />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
