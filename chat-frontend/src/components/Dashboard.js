import io from "socket.io-client";
import { useEffect, useState } from "react";
import "./dashboard.css";

const socket = io.connect("http://localhost:4000");

function Dashboard() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    console.log("room joined")

    if (room !== "") {
      socket.emit("join_room", room);
      console.log("room joined")
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    console.log("message sent" + message + room)
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
      console.log("message recieved")
    });
  }, []);
  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      <p>{sendMessage} 
      {messageReceived}</p>
    </div>
  );
}

export default Dashboard;