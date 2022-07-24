import React, {useState} from "react";
import {useParams,useNavigate} from "react-router-dom";



const GroupSetting = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [group,setGroup] = useState({name:params.id,members:[]});
    const [disabled,setDisabled] = useState(true);
    const handleGoBack = () => {
        navigate(-1);
    };
    const handleOnChange  = (event) => {
      let {name,value} = event.target;
      setGroup({...group,[name]:value});
    };
    const handleOnSave = () => {
      setDisabled(true);
    };
    const handleOnEdit = () => {
        setDisabled(false);
        document.getElementById("name").focus();
    };
    return (
      <div className="w-[400px] h-[600px] bg-[#2d343e] p-[1rem] flex flex-col justify-between">
          <div className="flex">
              <span className="w-[40px]"><i className="far fa-arrow-left cursor-pointer" onClick={handleGoBack}/></span>
              Group Settings
          </div>
          <div className="flex flex-col w-full h-[90%] content-start">
              <div className="flex flex-row justify-between">
                  <input
                      type="text"
                      id="name"
                      name="name"
                      value={group.name}
                      onChange={handleOnChange}
                      disabled={disabled}
                      className="h-[50px] w-[80%] bg-[#404450] rounded-[5px] border-none pl-[10px]"
                  />
                  <div className="h-[50px] w-[20%] ml-[20px] text-center text-[20px] pt-[10px] cursor-pointer bg-[#404450] rounded-[5px] border-none">
                      {disabled ? <i className="fal fa-pen" onClick={handleOnEdit}/> : <i className="far fa-check" onClick={handleOnSave}/>}
                  </div>
                  </div>
          </div>
      </div>
    );
};

export default GroupSetting;