import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getAuth, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase-config";
import { resolvePath, useNavigate } from "react-router-dom";
import Logo from "../img/LOGO.png";
import "../app.css";
import "./smaller-components/vibb.css";
// const socket = io.connect("http://localhost:3002");

//Adding comment for testing git actions

function Dashboard() {
  const [vibbTrue, setVibbTrue] = useState(false);

  const changeStyle = () => {
    if (vibbTrue) {
      setVibbTrue(false);
    } else {
      setVibbTrue(true);
    }
  };

  const socket = useRef();
  const [recievedMessage, setRecievedMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [isSelectedPic, setIsSelectedPic] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [allMessages, setAllMessages] = useState(undefined);
  const [currentChatID, setCurrentChatId] = useState(undefined);
  const [msg, setMsg] = useState(undefined);
  const [selectedUserPhoto, setSelectedUserPhoto] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("1");
  const [searchResult, setSearchResult] = useState([]);

  //Osäker på om det här är korrekt men lämnar det så atm /Emmi
  const navigate = useNavigate();

  // const input = document.getElementById("textInput");
  // input.addEventListener("keyup", function(e) {
  //   if (e.key === "Enter") {
  //     document.getElementById("sendBtn").click();
  //   }
  // });





  const handleSend = async (e) => {
    e.preventDefault()
    if(msg.length === 0){
      alert("text can't be empty")
      return
    }

    await axios.post("http://localhost:3001/messages/addMessage", {
      from: currentUser.userId,
      to: currentChatID,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChatID,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...allMessages];
    msgs.push({ fromSelf: true, message: msg });
    setAllMessages(msgs);

    document.getElementById("textInput").value = "";
    setMsg("");
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setRecievedMessage({
          fromSelf: false,
          message: msg,
        });
      });
    }
  }, [allMessages]);

  useEffect(() => {
    recievedMessage && setAllMessages((prev) => [...prev, recievedMessage]);
  }, [recievedMessage]);

  useEffect(() => {
    if (currentChatID !== undefined) {
      getMessages();
    }
  }, [currentChatID]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:3001");
      socket.current.emit("add-user", currentUser.userId);
    }
  }, [currentUser]);

  const getMessages = async () => {
    if (currentUser) {
      const data = await axios.post(
        "http://localhost:3001/messages/getmessages",
        {
          from: currentUser.userId,
          to: currentChatID,
        }
      );

      setAllMessages(data.data);
    }
  };

  const SignOut = () => {
    const provider = new GoogleAuthProvider();
    signOut(auth, provider)
      .then((result) => {
        const auth = getAuth();

        signOut(auth)
          .then(() => {
            // Sign-out successful.
            console.log("test");
            localStorage.clear();
            navigate("/", { replace: true });
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const getAllUsers = async () => {
    if (currentUser) {
      const data = await axios.get(
        `http://localhost:3001/user/allusers/${currentUser.userId}`
      );
      setUsers(data.data.users);
      setSearchResult(data.data.users);
      console.log(data.data.users);
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
    }
  });

  const displayName = (currentUser) => {
    if (currentUser) {
      return <p className="text-black text-3xl">{currentUser.displayName}</p>;
    } else return "loading ...";
  };

  const displayImg = (currentUser) => {
    if (currentUser) {
      return (
        <img src={currentUser.photoUrl} alt="Avatar" class="rounded-full" />
      );
    } else return "loading ...";
  };

  const isSelected = (e, users) => {
    document.getElementById("selectedUser").classList.remove("hidden");
    setIsSelectedPic(users.photoUrl);
    setSelectedUserName(users.displayName);
    setCurrentChatId(users._id);
    setSelectedUserPhoto(users.photoUrl);
  };

  const mapUsers = (users) => {
    if (users.length > 0) {
      return users.map((users, index) => {
        return (
          <li
            className="flex justify-start border-b-2 mt-3 pb-3"
            key={index}
            onClick={(e) => isSelected(e, users)}
          >
            <div className="h-10 w-10 rounded-full bg-black">
              <img
                className="h-10 w-10 rounded-full"
                src={users.photoUrl}
                alt="Profile"
              />
            </div>
            <div className="flex justify-start items-center ml-3">
              {users.displayName}
            </div>
          </li>
        );
      });
    } else return <li> No results found</li>;
  };

  function DisplayAllMessage(msg) {
    if (msg)
      return msg.map((msg, index) => {
        if (msg.fromSelf)
          return (
            <div className="col-start-6 col-end-13 p-3 rounded-lg">
              <div className="flex items-center justify-start flex-row-reverse">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 flex-shrink-0">
                  <img
                    alt="userPic"
                    className="h-10 w-10 rounded-full"
                    src={currentUser.photoUrl}
                  />
                </div>
                <div
                  style={{ maxWidth: "60%" }}
                  className="relative mr-3 text-sm bg-indigo-200 py-2 px-4 shadow rounded-xl"
                >
                  <div>{msg.message}</div>
                </div>
              </div>
            </div>
          );
        else
          return (
            <div className="col-start-6 col-end-13 p-3 rounded-lg">
              <div className="flex items-center justify-start flex-row">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 flex-shrink-0">
                  <img
                    alt="selectedUserPic"
                    className="h-10 w-10 rounded-full"
                    src={selectedUserPhoto}
                  />
                </div>
                <div
                  style={{ maxWidth: "60%" }}
                  className="relative ml-3 text-sm bg-gray-200 py-2 px-4 shadow rounded-xl"
                >
                  <div>{msg.message}</div>
                </div>
              </div>
            </div>
          );
      });
    else return "Loading ...";
  }

  useEffect(() => {
    if (searchTerm.length > 0) {
      if (users) {
        console.log("test");
        let tempArr = [];

        for (var i = 0; i < users.length; i++) {
          for (
            var j = 0;
            j <= users[i].displayName.length - searchTerm.length;
            j++
          ) {
            let temp = users[i].displayName.substring(j, j + searchTerm.length);
            if (temp.toLowerCase() === searchTerm.toLowerCase()) {
              tempArr.push({
                _id: users[i]._id,
                displayName: users[i].displayName,
                photoUrl: users[i].photoUrl,
              });
              break;
            }
          }
        }
        setSearchResult(tempArr);
        document.getElementById("selectedUser").classList.add("hidden");
      }
    } else {
      if (users) {
        setSearchResult(users);
      }
    }
  }, [searchTerm]);

  return (
    <div className="flex h-screen text-black-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div
          class="top-0 left-0 w-[20vw] flex flex-col py-8 pl-6 pr-2 w-80 bg-white border-r-2 flex-shrink-0"
          style={{ borderRadius: "7px" }}
        >
          <div className="flex justify-center flex-col items-center">
            {displayImg(currentUser)}
            <div className="my-2">{displayName(currentUser)}</div>

            <div className="Search">
              <div className="relative mt-7 mb-7">
                <input
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                  type="search"
                  id="default-search"
                  className="block p-4 mr-3 w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-[#aaacdc] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search conversations..."
                />
              </div>
            </div>
          </div>

          <div></div>

          <div className="bg-white h-full w-full rounded-lg overflow-y-auto overflow-x-hidden">
            <ul className="p-2 cursor-pointer">{mapUsers(searchResult)}</ul>
          </div>

          <div className="flex flex-col justify-center items-center">
            <button
              id="signOut"
              onClick={SignOut}
              type="button"
              class="text-white bg-[#6067ad] hover:bg-[#aaacdc] rounded-lg text-m px-10 py-1 mt-4  inline-flex items-center dark:focus:ring-[#4285F4]/55 "
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div
            className="flex flex-row items-center hidden justify-center pb-2 border-b-2 text-lg"
            id="selectedUser"
          >
            <div className="flex items-center mt-2 justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              <img
                src={isSelectedPic}
                alt="profilepic"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <p className="pl-2">{selectedUserName}</p>
          </div>
          <div className="flex flex-col flex-auto h-3/4 p-6 bg-white">
            <div
              className={`${
                vibbTrue ? "vibb1" : ""
              } flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white mb-2 p-4 overflow-auto h-full flex-col-reverse`}
            >
              <div id="chatFeed" className="flex flex-col mb-4">
                <div className="flex flex-col">
                  {DisplayAllMessage(allMessages)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center rounded-xl bg-[#f3f3fb] w-full h-16 px-4">
            <div className="flex-grow ml-2">
              <div className=" w-full">
                <form className="flex flex-row" onSubmit={handleSend} id="send-message">
                  <input
                    className="form-control"
                    type="text"
                    name="messageText"
                    id="textInput"
                    class="flex h-10 w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4"
                    onChange={(e) => {
                      setMsg(e.target.value);
                    }}
                    
                  />
                <button
                id="sendBtn"
                type="submit"
                className="flex items-center justify-center bg-[#6067ad] hover:bg-[#aaacdc] rounded-xl text-white px-4 py-0.5 mb-2 mt-2 ml-2 flex-shrink-0"
              >
                <span>Send</span>
              </button>
              <button
                class="flex ml-2 items-center justify-center bg-[#6067ad] hover:bg-[#aaacdc] rounded-xl text-white px-4 py-0.5 mb-2 mt-2 flex-shrink-0"
                onClick={changeStyle}
                id="vibbButton"
              >
                Vibb
              </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
