const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());



const io = require("socket.io")(4000, {
  cors: {
    origin: ["http://localhost:8080"]
  }
})

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(data)
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data)
    socket.to(data.room).emit("receive_message", data);
  });
});

app.listen(3000, () => {
  console.log("SERVER IS RUNNING ON ");
});