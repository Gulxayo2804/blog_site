const express = require('express');
const moongose = require('mongoose');
const app = express();


const MONGODB_URI =
    'mongodb+srv://gulkhayo:gulkhayo@cluster0.rkdaucr.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0';

moongose
    .connect(MONGODB_URI)
    .then(() => {
        app.listen(8080, () => {
            console.log('Working..')
        })
    })
    .catch(err => { console.log('error connection with db') })

