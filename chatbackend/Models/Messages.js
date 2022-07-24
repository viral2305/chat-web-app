const mongoose = require('mongoose');
const {Schema} = mongoose;

const msgSchema = Schema({
    messageContent: {
        type: String,
        required: true,
    },
    messageTime:{
        type : Date,
        default: Date.now
    },
    msgBy: {
        type: String,
        required: true,
    },
    msgTo:{
        type: String,
        required: true,
    },
    messageType:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model('Message', msgSchema);