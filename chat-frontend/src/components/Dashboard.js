import io from "socket.io-client";
import { useEffect, useState } from "react";
import axios from 'axios';
import { getAuth, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase-config"
import { useNavigate } from "react-router-dom"
import Logo from '../img/LOGO.png'
import '../app.css'
import './smaller-components/vibb.css'
// const socket = io.connect("http://localhost:3002");

const socket = io('http://localhost:3000', { transports: ['websocket'] });

//Adding comment for testing git actions


function Dashboard() {

  const [currentUser, setCurrentUser] = useState(undefined)
  const [users, setUsers] = useState([])
  //Osäker på om det här är korrekt men lämnar det så atm /Emmi
  const navigate = useNavigate();

  const SignOut = () => {
    const provider = new GoogleAuthProvider();
    signOut(auth, provider).then((result) => {

      const auth = getAuth();

      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      navigate("/", { replace: true })
    })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/")
    }
    setCurrentUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  const getAllUsers = async () => {
    if (currentUser) {
      const data = await axios.get(`http://localhost:3001/allusers/${currentUser.uid}`)
      console.log('test')
      console.log(data.data.users)
      setUsers(data.data)
    }
  }

useState(()=>{
  if(users.length === 0){
    getAllUsers(currentUser)
  }
})


  const displayName = (currentUser) =>{
    if(currentUser){
      return(
        <p className="text-white text-3xl">{currentUser.displayName}</p>
      )
    }else return("loading ...")
  }

  const displayImg = (currentUser) =>{
    if(currentUser){
      return(
        <img
        src={currentUser.photoUrl}
        alt="Avatar"
        class="rounded-full"
      />
      )
    }else return("loading ...")
  }


  return (


    <div class="flex h-screen antialiased bg-[#1a659e] text-black-800">
      <div class="flex flex-row h-full w-full overflow-x-hidden">
        <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-blue-650 flex-shrink-0" style={{ borderRadius: '7px' }}>
          <div class="flex justify-center flex-col items-center">
            {displayImg(currentUser)}
          <div className="my-2">
            {displayName(currentUser)}
            {console.log(users)}
          </div>
            
          </div>
            <div>
          </div>
          <div className="bg-white h-full w-full rounded-lg">

          </div>


          <div className="flex flex-col justify-center items-center">
            <button id="signOut" onClick={SignOut} type="button" class="text-black bg-gray-400 hover:bg-gray-200 rounded-lg text-m px-10 py-1 mt-4  inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
              Sign out
            </button>
          </div>

        </div>
        <div class="flex flex-col flex-auto h-full p-6 bg-blue-650">
          <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white h-full p-4">
            <div class="ml-0"><img style={{ opacity: '40%', marginLeft: '65%', zIndex: '0', position: 'absolute' }} className=" h-30 w-auto" src={Logo} alt="Logo" /></div>
            <div className="flex flex-col h-full overflow-x-auto mb-4 ">
              <div class="flex flex-row items-center">
                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                  <img
                    src={localStorage.getItem("userProfilePic")} alt="profilepic"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div>

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
                      onChange={() => {
                        console.log('test')
                      }}
                    />
                  </form>
                </div>
              </div>
              <div class="ml-4">
              <button>Vibb</button>
                <button
                  type="submit"
                  class="flex items-center justify-center bg-[#004e89] hover:bg-[#f7c5a0] rounded-xl text-white px-4 py-1 flex-shrink-0"
                  onClick={() => { console.log('test') }}
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