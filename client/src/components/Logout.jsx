import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const userData = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    if (userData) {
      const { _id } = userData;
      const { status } = await axios.get(`${logoutRoute}/${_id}`);
      if (status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center p-2 rounded-md bg-[#5865f2] hover:bg-[#4752c4] transition-colors duration-200"
    >
      <BiPowerOff className="text-sm text-white" />
      <span className="text-white text-xs px-1">Logout</span>
    </button>
  );
}
