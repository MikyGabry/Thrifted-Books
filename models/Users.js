const mongoose = require ('mongoose');


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [ true, "Hey, you must enter an email"],
        unique: [ true, "There is an account with that email address"]
    },

    password: {
        type: String,
        required: [true, "You must enter a password"]
    },

    userName: {
        type: String,
        required: [true, "Please enter your username"],
        unique: [ true, "That username already exists"]
    },

    seller: {
        type: Boolean, 
        required: [true]
    }
} // close Schema
,

{timestamps: true}
);

const User = mongoose.model('user', userSchema);

module.exports = User;