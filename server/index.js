import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { Server as socketIoServer } from 'socket.io'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Successful');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });

app.get('/ping', (_req, res) => res.json({ msg: 'Ping Successful' }));
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = new socketIoServer(server, {
  cors: {
    origin: true, 
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("add-user", async (userId) => {
    onlineUsers.set(userId, socket.id);

    io.emit("user-status-changed", { userId, isOnline: true });

    const currentlyOnlineUsers = Array.from(onlineUsers.keys());
    socket.emit("initial-online-users", currentlyOnlineUsers);
  });

  socket.on("disconnect", () => {
    const userId = [...onlineUsers].find(([_, id]) => id === socket.id)?.[0];
    if (userId) {
      onlineUsers.delete(userId);

      io.emit("user-status-changed", { userId, isOnline: false });
    }
    console.log("A user disconnected");
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

