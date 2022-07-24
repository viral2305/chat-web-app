const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    socketId:{
        type: String,
        required: true,
    }
},  {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            return ret;
        },
    },
});
module.exports = mongoose.model('User', userSchema);