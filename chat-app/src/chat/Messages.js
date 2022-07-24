import React, {useEffect, useState} from "react";
import { config} from "../ApiHelper/ApiUrl";
import {to_Decrypt} from "../aes";
import Popover from "@material-ui/core/Popover/Popover";
import {getDate, getTime} from "../utils";
import {fetchApi} from "../utils/api";

const Messages = ({message, type, user, deleteMsg, updateMsg, index}) => {
    const [show, setShow] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [name, setName] = useState(false);
    useEffect(async () => {
        if (type === "Group") {
            let data = await fetchApi(`${config.ApiUrl}/name/${message.msgBy}`,{
                method:"GET"
            });
            setName(data.data);
        }
    }, [message]);
    const handleMouseEnter = () => {
        setShow(true);
    };
    const handleMouseLeave = () => {
        setShow(false);
    };
    const handleOptions = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    if (message.msgBy === user._id || message.from === user.userName) {
        return (
            <div
                className="message mess-right bg-[skyblue] mt-[5px] relative rounded-tl-[10px] rounded-bl-[10px] rounded-br-[10px] p-[10px]"
                key={index} onMouseEnter={() => {
                handleMouseEnter()
            }} onMouseLeave={() => {
                handleMouseLeave()
            }}>
                <div className="text-black">{to_Decrypt(message.messageContent, user.userName)}</div>
                {show && <>
                    <i className="far fa-ellipsis-v absolute ml-[5px] cursor-pointer" onClick={handleOptions}/>
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
                                    onClick={() => {
                                        deleteMsg(message._id);
                                        setAnchorEl(null);
                                    }}>Delete message</span>
                            {/*<span className="text-[#ffffff] w-[150px] h-[40px] text-center pt-[6px] cursor-pointer hover:bg-[#404450]" onClick={updateMsg.bind(this,message._id)}>Edit message</span>*/}
                        </div>
                    </Popover>
                </>
                }
                <div>
                    <span className="text-[0.7rem] pl-2 text-black">{type === "Group" ? "You" : ''}</span>
                    <span className="text-[0.7rem] pl-2 text-black">{getDate(message.messageTime)}</span>
                    <span className="text-[0.7rem] pl-2 text-black">{getTime(message.messageTime)}</span>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="message mt-[5px] bg-[cornflowerblue] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] p-[10px]" key={index}>
                    <div className="text-black">{to_Decrypt(message.messageContent, user.userName)}</div>
                    <span className="text-[0.7rem] pl-2 text-black">{type === "Group" ? name : ''}</span>
                    <span className="text-[0.7rem] pl-2 text-black">{getDate(message.messageTime)}</span>
                    <span className="text-[0.7rem] pl-2 text-black">{getTime(message.messageTime)}</span>
                </div>
            </>
        );
    }
};

export default Messages;