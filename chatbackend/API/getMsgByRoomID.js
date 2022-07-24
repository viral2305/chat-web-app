const message = require("./Models/Messages");
const express = require("express");
const msg = express.Router();

msg.get("/roomId",async (req,res) => {
    const d = await message.find();
    console.log("HELLO GET MESSAGES",d);
});

module.exports = msg;
