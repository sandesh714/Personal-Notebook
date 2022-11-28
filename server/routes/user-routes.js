const express = require('express');
const User = require('../models/user');
const auth = require("../middlewares/auth");
const router = new express.Router();



router.post('/users/register', async(req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        const resuser = user._id
        res.status(201).send({
            token,
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
});



//Login 
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.username,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.status(200).send({ token});
    } catch (e) {
        res.status(500).send({ message: "Unable to login" });
    }
});


//Logout 
router.post("/users/logout", auth,  async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save();
        res.send({message: "Logged Out"})
    } catch (e) {
        res.status(500).send(e);
    }
})


//Get details 

router.get("/users/me", auth, async(req, res) => {
    res.send(req.user);
})


module.exports = router;