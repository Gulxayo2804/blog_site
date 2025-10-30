const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:'I am new!'
    },
    posts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }]

}, {
    timestamps: true
});

module.exports = mongoose.Model("User", UserModel);