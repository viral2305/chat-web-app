import React, {useState, useEffect, useRef, useContext} from "react";
import * as Swal from "sweetalert2";
import { to_Encrypt} from "../aes.js";
import {config} from "../ApiHelper/ApiUrl";
import Messages from "./Messages";
import {CallContext} from "../Contexts/CallContext";
import {fetchApi} from "../utils/api";
import "./chat.scss";

const Chat = ({
      user,
      messageTo,
      type,
      socket,
      selectedItem,
      handleOnChat
}) => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const {call,receivingCall,callUser} = useContext(CallContext);
    useEffect(async () => {
        await getMessages();
        socket.on("message", (data) => {
            getMessages();
        });
    }, [selectedItem]);
    const getMessages = async () => {
        let data = await fetchApi(
            `${config.ApiUrl}/message/${type}`,
            {
                method:"POST",
                body:JSON.stringify({id: selectedItem._id, user: user})
            });
        setMessages(data);
    };
    const updateMsg = (id) => {
        console.log("Id", id);
    };
    const deleteMsg = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this message!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            allowOutsideClick: false,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                socket.emit("messageDelete",id);
                Swal.fire({
                    title:'Deleted!',
                    text:'Your message has been deleted.',
                    icon:'success',
                    timer:1500,
                    showConfirmButton:false
                });
            }
        });
    };
    const sendData = () => {
        let date = new Date();
        if (text !== "") {
            //encrypt here
            const ans = to_Encrypt(text);
            socket.emit("chat", {ans, userId: user._id, msgTo: selectedItem._id,serverId:selectedItem.socketId, date, type});
            setText("");
        }
    };
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    };

    useEffect(scrollToBottom, [messages]);
    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            sendData();
        }
    };
    return (
        <>
             <div className="chat">
                    <div className="flex justify-start">
                        <span className="w-[40px]" onClick={handleOnChat}>
                            <i className="far fa-arrow-left text-[black]"/>
                        </span>
                        {/*<Link to={`/groupSettings/${messageTo}`} className="cursor-pointer text-[black]">*/}
                        <span className=" text-[black]">{messageTo}</span>
                        {/*</Link>*/}
                        {messageTo !== user.userName && <div className="flex flex-row w-[40px] ml-[20px] mt-[4px]">
                            <i className="fas fa-phone-alt cursor-pointer text-[black]" onClick={() => {
                                callUser(selectedItem.socketId,selectedItem.name, "audio")
                            }}/>
                            <i className="fas fa-video ml-[20px] cursor-pointer text-[black]"
                               onClick={() => callUser(selectedItem.socketId,selectedItem.name,"video")}/>
                        </div>}
                    </div>
                    <div id="chat-message" className="chat-message mb-[5px]">
                        {messages.map((message, index) => (
                            <Messages message={message} type={type} user={user} deleteMsg={deleteMsg} updateMsg={updateMsg}
                                      index={index} key={index}/>
                        ))}
                        <div ref={messagesEndRef}/>
                    </div>
                    <div className="send">
                        <input
                            placeholder={`Message ${messageTo}`}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyPress={(e) => handleOnKeyPress(e)}
                        />
                        <button onClick={sendData}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px]" viewBox="0 0 512 512">
                                <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"/>
                            </svg>
                        </button>
                    </div>
                </div>
        </>
    );
};

export default Chat;

