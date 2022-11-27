const express = require('express');
const User = require('../models/user');
const router = new express.Router();


router.post('users/register', async(req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send({
            user,
            message: "New user account created"
        });
    } catch(e){
        console.log(e)
        if (user.password.length < 10){
            res.status(500).send({
                message: "Password should have atleast 10 characters",
            });
        } else if (e.keyPattern.username == 1){
            res.status(500).send({
                message: "Username is already taken",
            });
        } else {
            res.status(500).send({
                message: "Something went wrong.",
            })
        }
    }
})


module.exports = router