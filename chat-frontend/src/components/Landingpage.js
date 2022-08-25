import React from 'react'
import "../app.css"

function Landingpage() {
  return (
    <>
    <div className="w-full h-screen flex justify-center items-center bg-blue-300 bg-image overflow-hidden">

      <div className=' flex flex-col justify-center items-center w-1/3 h-2/3 bg-blue-900' style={{borderRadius: "50%", marginTop: "27%", marginLeft: "5%"}}> 
        <h1 className='text-white text-3xl'>
          Chattis the best chatting app world wide! 
        </h1>

        <div>
        <button class="bg-orange-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mt-7">
        Join us
      </button>
      
        </div>
      </div>


    </div>
    </>
  )
}

export default Landingpage
