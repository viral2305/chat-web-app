import {config} from "../ApiHelper/ApiUrl";

const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
};
export const fetchApi = async (
    url,
    params={},
    headers = {},
) => {
    let data = await fetch(url,{...params,headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            accessToken: localStorage.getItem("accessToken"),
        ...headers}
    }).then((res) => {
        if(res.status === 401){
            handleLogOut();
        }
        else if(res.ok){
            return res.json();
        }
    });
    return data;
};