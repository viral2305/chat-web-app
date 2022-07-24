import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {config} from "../ApiHelper/ApiUrl";
import "./CreateGroup.css";
import {fetchApi} from "../utils/api";


const CreateGroup = ({user,handleSettings}) => {
    const navigate = useNavigate();
    const [group, setGroup] = useState({createdBy:user.name,name: "", members: []});
    const [members, setMembers] = useState(null);
    useEffect(async () => {
        if (members === null) {
            let data = await fetchApi(`${config.ApiUrl}/users`);
            setMembers(JSON.parse(JSON.stringify(data)))
        }
    }, []);
    const handleGoBack = () => {
        navigate(-1);
    };
    const handleOnChange = (event) => {
        let {name, value} = event.target;
        setGroup({...group, [name]: value});
    };
    const handleMembers = (event) => {
        if(event.target.checked){
            group.members.push(event.target.value);
            setGroup({...group});
        }
        else{
            let index = group.members.indexOf(event.target.value);
            group.members.splice(index,1);
            setGroup({...group});
        }
    };
    const handleOnSubmit = async () => {
        let data = await fetchApi(`${config.ApiUrl}/createGroup`,{
            method:"POST",
            body:JSON.stringify(group)
        });
        if(data.success){
            handleSettings();
        }
    };
    return (
        <div className="w-full h-full p-[1rem] flex flex-col justify-between back-ground">
            <div className="flex text-[black]">
                Create Group
            </div>
            <div className="flex flex-col w-[40%] h-[90%] items-center">
                <input
                    type="text"
                    id="name"
                    placeholder="Enter Group Name"
                    name="name"
                    value={group.name}
                    onChange={handleOnChange}
                    className="h-[50px] w-[80%] bg-[#404450] rounded-tr-[8px] rounded-tl-[8px] border-none pl-[10px]"
                />
                <div className="flex w-[80%] mt-[4px] pb-[8px] h-auto bg-[#404450] justify-center">
                    <ul className="w-full">
                        {members !== null && members.length > 0 && members.map((item, index) => (
                            <li className="mt-2 rounded-[8px] pl-[20px] pt-[10px] cursor-pointer h-[40px]" key={index}>
                                <div>
                                    <span>{item.name}</span>
                                    <span className="mr-[20px] float-right">
                                      <input type="checkbox" value={item.name} onChange={handleMembers}/>
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    className="w-[80%] pt-[0.5rem] mt-[10px] pr-[1rem] pb-[0.5rem] pl-[1rem] bg-[#ffac41] rounded-bl-[5px] rounded-br-[5px] text-[black] cursor-pointer"
                    onClick={handleOnSubmit}>Create
                </button>
            </div>
        </div>
    );
};

export default CreateGroup;