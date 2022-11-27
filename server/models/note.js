const mongoose = require("mongoose");



const noteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true,
        trim: true
    },
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    }
}, 
{
    timestamps: true,
    toJSON: {virutals: true},
})


const Note = mongoose.model("Note", noteSchema);

module.exports = Note