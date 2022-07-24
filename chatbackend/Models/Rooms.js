const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
    },
    members:{
        type:Array,
        required:true,
    },
    createdBy:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Room',roomSchema);