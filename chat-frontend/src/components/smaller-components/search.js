import React, {useState} from 'react'
import Axios from 'axios'
import '../../app.css'

function Search() {
    const [userList, setUserList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getUsers = () => {
      Axios.get("http://localhost:3001/user/allUsers").then((response) => {
        setUserList(response.data);
        console.log(response.data)
      });
    };

  return (
    <div className='Search'>
    <div class="relative mt-7 mb-7">
    <input onChange={e => setSearchTerm(e.target.value)} type="search" id="default-search" class="block p-4 left-0 w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search conversations..." />
    <button onClick={getUsers} type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 light:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
    {userList.filter((user) => {
        if (searchTerm === "") {
            return console.error("error");
        } else if (user.displayName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return user.displayName 
        }
    }).map((user) => {
        return <div class="relative mt-7 mb-7"> 
<li className="listItem" key={user._id}>
{user.displayName}
 </li>        
         </div>
    })}
    </div>
  )
}

export default Search