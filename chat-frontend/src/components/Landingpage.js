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
    <div  class="flex h-full w-full justify-center mt-40">
    <form class="bg-white hover:shadow-2xl w-96 h-98 rounded-full justify-center items-center bg-white-400">
      <div class="mb-4 flex justify-center items-center mt-20 flex-col">
      <button 
      onClick={googleAuth}
      type="button"
      class="hover:shadow-2xl shadow-2xl justify-center items-center w-40 text-white bg-[#6067ad] hover:bg-[#aaacdc] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:focus:ring-[#4285F4]/55"
      >Join with google </button> 
      <img className="justify-center" src={Logo} alt="Logo"  />
      </div>

    </form>
    <svg className="absolute -bottom-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000b76" fill-opacity="0.6" d="M0,192L288,224L576,96L864,128L1152,256L1440,96L1440,320L1152,320L864,320L576,320L288,320L0,320Z"></path></svg>
    
  </div> 


    </>
  );
}

export default Landingpage;
