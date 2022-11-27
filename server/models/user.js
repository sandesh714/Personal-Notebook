const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// User schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength : 10,
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign(
        {_id: user.id.toString()},
        process.env.JWT_SECRET
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}



userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("Unable to Login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to Login");
    }
    return user;
};





userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 5)
    }
    next();
})



const User = mongoose.model("User", userSchema);
module.exports = User;