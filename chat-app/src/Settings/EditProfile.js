import React, {useEffect, useState} from "react";
import {config} from "../ApiHelper/ApiUrl";
import Swal from 'sweetalert2';
import {fetchApi} from "../utils/api";

const EditProfile = ({user, handleSettings}) => {
    const [profile, setProfile] = useState({});
    const [password,setPassword] = useState({});
    useEffect(() => {
        if (user) {
            setProfile(user);
            setPassword({...password,["email"]:user.email});
        }
    }, [user]);
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value});
    };
    const handlePasswordChange = (e) => {
        const {name,value} = e.target;
        setPassword({...password,[name]:value});
    };
    const handleOnSubmit = async () => {
        let data = await fetchApi(`${config.ApiUrl}/editFullProfile`,{
            method:"PUT",
            body:JSON.stringify(profile)
        });
        localStorage.setItem("user", JSON.stringify(data.data));
        handleSettings();
    };
    const handleUpdatePassword = async () => {
        let data = await fetchApi(`${config.ApiUrl}/updatePassword`,{
            method:"PUT",
            body:JSON.stringify(password),
        });
        if(data.success){
            localStorage.setItem("user", JSON.stringify(data.data));
            handleSettings();
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.error,
                confirmButtonText: 'retry',
                allowOutsideClick:false
            })
        }
    };
    return (
        <div className="w-full h-full p-[1rem] flex flex-col  back-ground">
            <div className="flex text-black">
                <span className="w-[40px]"><i className="far fa-arrow-left cursor-pointer text-[black]"
                                              onClick={handleSettings}/></span>
                Edit Profile
            </div>
            <div className="flex flex-row w-full">
                <div className="flex mt-[20px] flex-col w-[40%] h-[90%] items-center">
                    <label className="text-[black] font-bold text-[20px]">Update Details</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleOnChange}
                        className="h-[50px] mt-[10px] w-[80%] bg-[#404450] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[8px] rounded-br-[8px] border-none pl-[10px]"
                    />
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={profile.userName}
                        onChange={handleOnChange}
                        className="h-[50px] mt-[10px] w-[80%] bg-[#404450] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[8px] rounded-br-[8px] border-none pl-[10px]"
                    />
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleOnChange}
                        className="h-[50px] mt-[10px] w-[80%] bg-[#404450] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[8px] rounded-br-[8px] border-none pl-[10px]"
                    />
                    <button
                        className="w-[80%] pt-[0.5rem] mt-[10px] pr-[1rem] pb-[0.5rem] pl-[1rem] bg-[#ffac41] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-[5px] rounded-br-[5px] text-[black] cursor-pointer"
                        onClick={handleOnSubmit}>Update Details
                    </button>
                </div>
                <div className="flex mt-[20px] flex-col w-[40%] h-[90%] items-center">
                    <label className="text-[black] font-bold text-[20px]">Update Password</label>
                    <input
                        type="password"
                        placeholder="Old password"
                        id="oldPassword"
                        name="oldPassword"
                        value={password?.oldPassword}
                        onChange={handlePasswordChange}
                        className="h-[50px] mt-[10px] w-[80%] bg-[#404450] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[8px] rounded-br-[8px] border-none pl-[10px]"
                    />
                    <input
                        type="password"
                        id="newPassword"
                        placeholder="New password"
                        name="newPassword"
                        value={password?.newPassword}
                        onChange={handlePasswordChange}
                        className="h-[50px] mt-[10px] w-[80%] bg-[#404450] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[8px] rounded-br-[8px] border-none pl-[10px]"
                    />
                    <input
                        type="password"
                        id="email"
                        placeholder="Confirm new password"
                        name="email"
                        value={password?.newPassword}
                        onChange={handlePasswordChange}
                        className="h-[50px] mt-[10px] w-[80%] bg-[#404450] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[8px] rounded-br-[8px] border-none pl-[10px]"
                    />
                    <button
                        className="w-[80%] pt-[0.5rem] mt-[10px] pr-[1rem] pb-[0.5rem] pl-[1rem] bg-[#ffac41] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-[5px] rounded-br-[5px] text-[black] cursor-pointer"
                        onClick={handleUpdatePassword}>Update Password
                    </button>
                </div>
            </div>
        </div>
    )

};

export default EditProfile;