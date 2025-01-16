import { io } from "socket.io-client";

const socket = io("https://chatapp-liaplus-assignment.onrender.com");
export default socket;