const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/user-routes.js');
const noteRouter = require('./routes/note-routes.js');

app.use(cors());
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