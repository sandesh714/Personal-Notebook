const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/user-routes.js');
const noteRouter = require('./routes/note-routes.js');

app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(userRouter);
app.use(noteRouter);


mongoose.connect(
    process.env.MONGO_SRI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Listening on Port ${process.env.PORT}`);
    })
})