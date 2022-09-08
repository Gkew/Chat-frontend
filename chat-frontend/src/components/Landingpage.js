import React from "react";
import "../app.css";
import { auth } from "../firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logo from '../img/LOGO.png'
function Landingpage() {
  const navigate = useNavigate();

  const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const userName = result.user.displayName;
        const userEmail = result.user.email;
        const userProfilePic = result.user.photoURL;

        localStorage.setItem("userName", userName);
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userProfilePic", userProfilePic);

        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>

      <div
        className="w-full h-screen flex justify-center bg-gray-200 items-center overflow-hidden"
      >
      <div >    
      <button 
      onClick={googleAuth}
      type="button"
      class="text-white bg-blue-500 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      >
      <svg
        class="mr-1 w-4 h-4"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      Sign in with Google
      </button></div>
        <div
          className=" flex flex-col justify-center items-center w-1/3 h-2/3 blur-sm"
          style={{
            backgroundColor: "#004e89",
            opacity: "80%",
            borderRadius: "50%",
            marginLeft: "25%",
            position: 'absolute'
        }}
        >
          <div>
          </div>

        </div>
<img style={{marginLeft: '17%'}} className=" h-30 w-auto" src={Logo} alt="Logo"  />
       

      </div>


    </>
  );
}

export default Landingpage;
