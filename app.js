const express = require('express');
const moongose = require('mongoose');
const app = express();

app.use(express.json());
const MONGODB_URI =
    'mongodb+srv://gulkhayo:gulkhayo@cluster0.rkdaucr.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0';


app.use((error, req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message, data})
})

moongose
    .connect(MONGODB_URI)
    .then(() => {
        app.listen(8080, () => {
            console.log('Working..')
        })
    })
    .catch(err => { console.log('error connection with db') })

