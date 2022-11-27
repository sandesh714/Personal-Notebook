const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/user-routes.js');


app.use(cors());
app.use(userRouter);


mongoose.connect(
    process.env.MONGO_SRI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Listening on Port ${PORT}`);
    })
})