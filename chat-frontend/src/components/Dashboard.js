import io from "socket.io-client";
import { useEffect, useState } from "react";
import axios from 'axios';
import { getAuth, signOut, GoogleAuthProvider } from "firebase/auth";
import {auth} from "../firebase-config"
import {useNavigate} from "react-router-dom"
import Logo from '../img/LOGO.png'
import '../app.css'
// const socket = io.connect("http://localhost:3002");

const socket = io('http://localhost:3002', { transports : ['websocket'] });


 

function Dashboard() {


  //Osäker på om det här är korrekt men lämnar det så atm /Emmi
  const navigate = useNavigate();
  
  const SignOut =  () =>{
    const provider = new GoogleAuthProvider();
    signOut(auth,provider).then((result)=>{
  
      const auth = getAuth();
  
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      }); 
     navigate("/", {replace:true})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const userName = localStorage.getItem("userName");
  const firstLetter = userName.charAt(0);

  const testingBackend = async () => {
    try{
      const response = await axios.get('http://localhost:3001/allUser')
      console.log(response.data)
    } catch(err){
      console.log(err)
    }
  }

    // Messages useStates
  const [room, setRoom] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);

  
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { sentMessage, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(messageReceived)
      setMessageReceived([...messageReceived, data.message]);
      console.log(messageReceived)
    });
  }, [socket]);

  return (

    
    <div class="flex h-screen antialiased bg-[#1a659e] text-black-800">
      <div class="flex flex-row h-full w-full overflow-x-hidden">
        <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-blue-650 flex-shrink-0" style={{borderRadius: '7px'}}>
         
            
          <div class="mt-0 mb-10 ml-14 h-20 w-20 rounded-full overflow-hidden">
            <img
              src={localStorage.getItem("userProfilePic")}
              alt="Avatar"
              class="h-full w-full"
            />
          </div>
          <div class="xs-2 ml-5 text-white text-2xl">
          <h3 name="userName">{localStorage.getItem("userName")}</h3>
        </div>
        <div>
        <button
          onClick={joinRoom}
          class="bg-transparent font-medium bg-gray-300 hover:bg-gray-200 py-2 px-4 text-black hover:border-transparent rounded mt-20 ml-9"
        >
          Join Room
        </button>
      </div>
          <div class="flex flex-col mt-10">

            <select
            style={{ borderRadius: "5px", textAlign: 'center'}}
              class="text-black font-semibold mr-7"
              type="text"
              value={room}
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            >
              <option value="" selected disabled style={{textAlign: "center"}}>
                Choose a room
              </option>
              <option value="funRoom">Fun room</option>
              <option value="darkRoom">Dark room</option>
            </select>
          </div>


          <div style={{position: 'absolute', bottom: '0'}} class="flex flex-col ">
          <button onClick={SignOut} type="button" class="text-black bg-gray-400 hover:bg-gray-200 rounded-lg text-m px-10 py-1  inline-flex items-center dark:focus:ring-[#4285F4]/55 mb-6 ml-7">
  Sign out
</button>
</div>

        </div>
        <div class="flex flex-col flex-auto h-full p-6 bg-blue-650">
          <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white h-full p-4">
          <div class="ml-0"><img style={{opacity: '40%', marginLeft: '65%', zIndex: '0', position: 'absolute'}} className=" h-30 w-auto" src={Logo} alt="Logo"  /></div>
            <div className="flex flex-col h-full overflow-x-auto mb-4 ">
              <div class="flex flex-row items-center">
                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                  <img
                    src={localStorage.getItem("userProfilePic")} alt="profilepic"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div>
                
                  {
                
                 messageReceived.map(function(item,i){
                    return <div class="relative ml-3 text-sm text-black bg-white bg-gray-300 py-2 px-4 shadow rounded-xl"> {item} </div>
                  })
                  
                  }
         
                </div>
              </div>
            </div>

            <div class="flex flex-row items-center h-16 rounded-xl bg-gray-300 w-full px-4">
              <div class="flex-grow ml-4 ">
                <div class="relative w-full">
                  <form method="post" action="/">
                  <textarea
                  className="form-control"
                    type="text"
                    name="messageText"
                    class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    onChange={(event) => {
                      setSentMessage(event.target.value);
                    }}
                  />
                  </form>
                </div>
              </div>
              <div class="ml-4">
                <button
                type="submit"
                  class="flex items-center justify-center bg-[#004e89] hover:bg-[#f7c5a0] rounded-xl text-white px-4 py-1 flex-shrink-0"
                  onClick={sendMessage}
                >
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;