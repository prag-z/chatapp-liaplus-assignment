# **LiaPlus Chat App – Real-Time Chat Application**\

A real-time chat application built with **React, Node.js, Express, MongoDB, and Socket.IO**

🌐 [Live Demo](https://liachat-app.vercel.app/)


## **Setup Instructions** 

### **1. Clone the Repository**  
```sh
git clone https://github.com/prag-z/chatapp-liaplus-assignment.git
cd chatapp-liaplus-assignment
```

## **2. Backend Setup**

### **2.1 Navigate to Backend Directory**
```sh
cd server
```

### **2.2 Install Dependencies**
```sh
npm Install
```

### **2.3 Configure Environment Variables**
Create a `.env` file inside the `server` directory and add the following:
```sh
PORT=<port_number>
MONGO_URL=<mongodb_connection_string>
```

### **2.4 Start the Backend Server**
```sh
node index.js
```

The backend will have started on `http://localhost:${PORT}`


## **3. Frontend Setup**

### **2.1 Navigate to Frontend Directory**
```sh
cd ../client
```

### **2.2 Install Dependencies**
```sh
npm Install
```

### **2.3 Configure Environment Variables**
Create a `.env` file inside the `server` directory and add the following:
```sh
REACT_APP_LOCALHOST_KEY=chat-app-current-user
REACT_APP_API_URL=http://localhost:5000
```

### **2.4 Start the Backend Server**
```sh
npm start
```

The frontend will have started on `http://localhost:3000`



## **Deployment Notes**
⚠ The backend deployed on **Render** may take a few seconds to start if inactive. 



