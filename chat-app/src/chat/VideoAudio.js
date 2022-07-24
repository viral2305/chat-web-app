import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {CallContext} from "../Contexts/CallContext";

const VideoAudio = ({
    callTo,
    user,
}) => {
    const navigate = useNavigate();
    const {callType,leaveCall,receivingCall,myVideo,userVideo,callEnded,callAnswer,callAccepted,name,handleCameraAndMic,audio, video} = useContext(CallContext);
    // useEffect(() => {}, []);
    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <div className="w-[100%] h-[100%] bg-[skyblue] p-[1rem] flex flex-col">
            <div className="flex">
                <span className="w-[40px]"><i className="far fa-arrow-left cursor-pointer" onClick={handleGoBack}/></span>
                {callTo}
            </div>
            <div className="grid justify-center content-center mt-[10px]">
                <div className="video">
                    {callType === "video" ? callAccepted && !callEnded ?
                        <video playsInline ref={userVideo} autoPlay className="w-[300px]"/> :
                        null :
                        <div className="w-[200px] h-[200px] bg-[#282b34] text-[#ff1e56] pt-[20px] text-[100px] font-bold text-center rounded-[100px]">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    }
                </div>
                <div className="video">
                    {callType === "video" ? callAccepted && !callEnded ?
                        <video playsInline muted ref={myVideo} autoPlay className="w-[300px]"/> :
                        null :
                        <div className="w-[200px] h-[200px] bg-[#282b34] text-[#ff1e56] pt-[20px] text-[100px] font-bold text-center rounded-[100px]">
                            {callTo.charAt(0).toUpperCase()}
                        </div>
                    }
                </div>
            </div>
            {/*<div className="myId">*/}
                <div className="mt-[20px]">
                    {callAccepted && !callEnded ? (
                        <div className="flex justify-between">
                            <button className="bg-[#3F51B5] w-[40px] h-[40px] rounded-[20px] mr-[20px]" onClick={() => handleCameraAndMic("audio")}>
                                {audio ? <i className="fas fa-microphone"/>:<i className="fas fa-microphone-slash"/>}
                            </button>
                            <button className="bg-[red] w-[40px] h-[40px] rounded-[20px]" onClick={()=>leaveCall(user.socketId)}>
                                <i className="fas fa-phone"/>
                            </button>
                            <button className="bg-[#3F51B5] w-[40px] h-[40px] rounded-[20px] ml-[20px]" onClick={() => handleCameraAndMic("video")}>
                                {video ? <i className="fas fa-video"/> : <i className="fas fa-video-slash"/>}
                            </button>
                        </div>
                    ) : ""}
                </div>
            {/*</div>*/}
            <div>
                {(receivingCall && !callAccepted) ? (
                    <div className="caller">
                        <h1 >{name} is calling...</h1>
                        <button className="bg-[green] animate-bounce w-[40px] h-[40px] rounded-[20px]" onClick={callAnswer}>
                            <i className="fas fa-phone-alt"/>
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default VideoAudio;