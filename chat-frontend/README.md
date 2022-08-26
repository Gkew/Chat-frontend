### Setup react project  
_npx create-ract-app chat-frontend_  
npm i react-router-dom  

### Setup for tailwind  
_npm install -D tailwindcss postcss autoprefixer_  
_npx tailwindcss init -p_  
#### tailwind.config.js  
```js
_/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}_
```
#### index.css
``` js
_@tailwind base;
@tailwind components;
@tailwind utilities;_  
npm run start
```

### Set up structure  
_cd src_  
mkdir components  
cd components  
touch Landingpage.js  
### Creating landingpage  
#### Landingpage.js  
``` js
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
```
### Setup Routes  
#### app.js  
``` js
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
```
