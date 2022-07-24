import React, {useEffect, createContext, useState, useRef} from "react";
import Peer from "simple-peer";
const CallContext = createContext();

const CallProvider = ({socket,user,children}) => {
    const [callType, setCallType] = useState('');
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState('');
    const [stream, setStream] = useState('');
    const [name, setName] = useState('');
    const [call, setCall] = useState(false);
    const [receivingCall, setReceivingCall] = useState(false);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [audio, setAudio] = useState(true);
    const [video, setVideo] = useState(true);
    const userVideo = useRef();
    const connectionRef = useRef();
    const myVideo = useRef();
    useEffect(() =>{
        navigator.mediaDevices.getUserMedia({ video: video, audio: audio ,sound:true}).then((stream) => {
            setStream(stream);
            myVideo.current.srcObject = stream;
        });

        socket.on("callUser", (data) => {
            console.log("DATA", data);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
            setCallType(data.callType);
            setReceivingCall(true);
            setCall(true);
        });

        socket.on("endCall", () => {
            setCall(false);
            setReceivingCall(false);
            setCallEnded(true);
            connectionRef.current.destroy();
            // window.location.href = "/";
        });
    },[]);

    const callUser = (id,receiverName,type) => {
        setCall(true);
        setCallType(type);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: user.socketId,
                name: user.name,
                callType: type
            })
        });

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const callAnswer = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });
        peer.on("signal", (data) => {
            socket.emit("answerCall", {signal: data, to: caller})
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = (id) => {
        socket.emit("endCall", ({id:id}));
    };

    const handleCameraAndMic = (type) => {
        switch (type) {
            case "audio":
                setAudio(!audio);
                break;
            case "video":
                setVideo(!video);
                break;
        }
    };
    return (
        <CallContext.Provider value={{
            callType,
            caller,
            callerSignal,
            stream,
            name,
            setName,
            call,
            receivingCall,
            callAccepted,
            callEnded,
            userVideo,
            myVideo,
            audio,
            video,
            callUser,
            callAnswer,
            leaveCall,
            handleCameraAndMic
        }}>
            {children}
        </CallContext.Provider>
    )
};

export {CallProvider,CallContext};