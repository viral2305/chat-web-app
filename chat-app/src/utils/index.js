import React from "react";


export const getTime = (dateTime) => {
    return `${new Date(dateTime).getHours()}:${new Date(dateTime).getMinutes()}${getAmPm(dateTime)}`
};

export const getAmPm = (time) => {
    return new Date(time).getHours() >= 12 ? "PM" : "AM";
};

export const getDate = (dateTime) => {
    let yesterdayTimeStamp = new Date().getTime() - 24*60*60*1000;
    if(new Date(dateTime).toDateString() === new Date().toDateString()){
        return "Today";
    }
    else if(new Date(dateTime).toDateString() === new Date(yesterdayTimeStamp).toDateString()){
        return "Yesterday";
    }
    else {
        return new Date(dateTime).toDateString();
    }
};