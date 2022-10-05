import React, { useEffect } from "react";
import "../app.css";
import { auth } from "../firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from '../img/LOGO.png'
function Landingpage() {
  const navigate = useNavigate();

  const postUser = async(userId, displayName, photoUrl) => {
      const res = await axios.post("http://localhost:3001/user/addUser", {
        userId,displayName,photoUrl
      })
  }


  const updateUserId = async (userId,displayName, photoUrl) =>{
    const res = await axios.get("http://localhost:3001/user/getuserid/"+userId)
    console.log(res)
    localStorage.setItem("user",JSON.stringify({
      "userId" : res.data,
      "displayName": displayName,
      "photoUrl": photoUrl
    }))
    navigate("/dashboard", { replace: true });
  }

  const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const userId = result.user.uid
        const displayName = result.user.displayName
        const photoUrl = result.user.photoURL
        
        postUser(userId,displayName,photoUrl)
        updateUserId(userId,displayName, photoUrl)

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
    if(localStorage.getItem("user")){
      navigate("/dashboard")
    }
  },[])

  return (
    <>
    <div class="flex h-full w-full justify-center mt-40">
    <form class="bg-white shadow-2xl w-96 h-98 rounded-full justify-center items-center bg-blue-200">
      <div class="mb-4 flex justify-center mt-20 flex-col">

      <button 
      onClick={googleAuth}
      type="button"
      class="shadow-2xl justify-center items-center w-60 ml-16 text-white bg-blue-500 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:focus:ring-[#4285F4]/55"
      >Join with google </button>
      <img className="justify-center" src={Logo} alt="Logo"  /> 
      </div>

    </form>
    
  </div>  

    </>
  );
}

export default Landingpage;
