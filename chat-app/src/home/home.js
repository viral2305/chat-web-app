import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Popover from "@material-ui/core/Popover";
import Modal from "@material-ui/core/Modal";
import {Box, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {fetchApi} from "../utils/api";
import {config} from "../ApiHelper/ApiUrl";
import {CallContext} from "../Contexts/CallContext";
import Chat from "../chat/chat";
import Settings from "../Settings";
import VideoAudio from "../chat/VideoAudio";
import "./home.scss";


const Homepage = ({socket, user}) => {
    const navigate = useNavigate();
    const {name, call, receivingCall, callAnswer, leaveCall,callAccepted, callEnded} = useContext(CallContext);
    const [users, setUsers] = useState(null);
    const [groups, setGroups] = useState([]);
    const [chat, setChat] = useState(false);
    const [settings, setSettings] = useState(false);
    const [msgType, setMsgType] = useState('');
    const [selectedItem, setSelectedItem] = useState({});
    const [title, setTitle] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    useEffect(async () => {
        if (user === undefined || user === null) {
            navigate("/login");
        } else {
            const data = await fetchApi(`${config.ApiUrl}/groups/${user?.name}`);
            setGroups(JSON.parse(JSON.stringify(data)));
            if (users === null) {
                const data = await fetchApi(`${config.ApiUrl}/users`);
                setUsers(JSON.parse(JSON.stringify(data)));
            }
        }
        socket.on("me", async (id) => {
            let data = await fetchApi(`${config.ApiUrl}/editProfile`,{
                method: "PUT",
                body:JSON.stringify({
                    _id: user._id,
                    socketId: id,
                })
            });
            localStorage.setItem("user", JSON.stringify(data.data));
        });
    }, [user]);
    const handleOnSettings = (name) => {
        setChat(false);
        setSettings(true);
        setTitle(name);
        setAnchorEl(false);
    };
    const handleLogOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        navigate("/login");
    };
    const handleOptions = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOnMessage = (item, type) => {
        setChat(true);
        setSettings(false);
        setMsgType(type);
        setSelectedItem(item);
    };
    const handleSettings = () => {
        setSettings(false);
    };
    const handleOnChat = () => {
        setChat(false);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            <div className="flex flex-row w-full h-full fixed">
                <div className="flex-col justify-start w-[20%] h-full bg-[#2d343e] p-8">
                    <div
                        className="ml-[0px] flex items-center justify-between rounded-[20px] border-[white] border-[1px] h-[40px] w-[90px]">
                        <div
                            className="w-[35px] h-[35px] bg-[whitesmoke] text-[darkgoldenrod] pt-[2px] text-[20px] font-bold text-center rounded-[100px]">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <i className="fas fa-chevron-down text-[black] cursor-pointer" onClick={handleOptions}/>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <div className="flex flex-col w-[150px] h-auto bg-[#282b34] text-[black] relative">
                                <span
                                    className="text-[#ffffff] w-[150px] h-[40px] text-center pt-[6px] cursor-pointer hover:bg-[#404450]"
                                    onClick={() => handleOnSettings("EditProfile")}>Edit Profile</span>
                                <span
                                    className="text-[#ffffff] w-[150px] h-[40px] text-center pt-[6px] cursor-pointer hover:bg-[#404450]"
                                    onClick={() => handleOnSettings("CreateGroup")}>Create Group</span>
                                <span
                                    className="text-[#ffffff] w-[150px] h-[40px] text-center pt-[6px] cursor-pointer hover:bg-[#404450]"
                                    onClick={handleLogOut}>Log Out</span>
                            </div>
                        </Popover>
                    </div>
                    <div className="flex w-full h-full mt-[10px] mb-[10px] overflow-y-auto flex-col items-start">
                        <ul className="w-full">
                            {groups.length > 0 && groups.map((item, index) => {
                                return (
                                    <li className={`mt-2 rounded-[8px] pl-[20px] pt-[10px] cursor-pointer h-[40px] `}
                                        onClick={() => {
                                            handleOnMessage(item, "Group")
                                        }} key={index}>
                                        <div>
                                            <span
                                                className={`text-[grey] hover:text-[white] ${selectedItem.roomName === item.roomName ? "font-bold text-[white]" : ''}`}>{item.roomName}</span>
                                        </div>
                                    </li>
                                )
                            })}
                            {users !== null && users.length > 0 && users.filter((ele) => {
                                return ele.name !== user?.name;
                            }).map((item, index) => {
                                return (
                                    <li className={`mt-2 rounded-[8px] pl-[20px] pt-[10px] cursor-pointer text-[grey] h-[40px] hover:text-[white]`}
                                        onClick={() => {
                                            handleOnMessage(item, "Personal")
                                        }} key={index}>
                                        <div>
                                            <span className={`text-[grey] hover:text-[white] ${selectedItem.name === item.name ? "font-bold text-[white]" : ''}`}>
                                                {item.name}
                                                {item.name === user?.name ?
                                                <span className="pl-[5px] text-[10px] text-[grey]">(you)</span> : ''}
                                            </span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                {chat && !callAccepted &&
                <Chat
                    user={user}
                    messageTo={selectedItem?.roomName || selectedItem?.userName}
                    selectedItem={selectedItem}
                    type={msgType}
                    socket={socket}
                    handleOnChat={handleOnChat}
                />
                }
                {settings &&
                <Settings
                    title={title}
                    user={user}
                    handleSettings={handleSettings}
                />
                }
                {!chat && !settings && !call &&
                <div className="w-full h-full p-[1rem] flex flex-col back-ground"/>
                }
                {callAccepted && !callEnded &&
                    <VideoAudio callTo={name} user={user}/>
                }
                <Modal
                    open={receivingCall && !callAccepted}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="flex justify-center mb-[20px]">
                            <Typography id="modal-modal-title" style={{color: "black"}} variant="h6" component="h2">
                                {name} is calling...
                            </Typography>
                        </div>
                        <div className="flex justify-between">
                            <Button variant="contained" color="secondary" onClick={() => leaveCall()}>
                                Reject
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => callAnswer()}>
                                Answer
                            </Button>
                        </div>
                    </Box>
                </Modal>

            </div>
        </>
    );
};

export default Homepage;
