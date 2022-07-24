import React from "react";
import CreateGroup from "./CreateGroup";
import EditProfile from "./EditProfile";



const Settings = ({title,user,handleSettings}) => {
  switch (title) {
      case "CreateGroup":
          return <CreateGroup user={user} handleSettings={handleSettings}/>;
      case "EditProfile":
          return <EditProfile user={user} handleSettings={handleSettings}/>;
  }
};

export default Settings;