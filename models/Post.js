const mongoose = require('mongoose');

const postModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        // required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postModel)