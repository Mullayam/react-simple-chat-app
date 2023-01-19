const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app =express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods:["GET","POST"],
  },
});
io.on("connection",(socket)=>{
  console.log(socket.id)
  socket.on("joinRoom", (chatroom) => { socket.join(chatroom) });

  socket.on("newMessages", ({ newMessages, chatroom }) => {        
    io.in(chatroom).emit("latestMessages", (newMessages) => {});
  });
})
app.get("/",(req,res)=>{
    res.send("hi");
});
server.listen(5000,()=>console.log("http://localhost:5000"))