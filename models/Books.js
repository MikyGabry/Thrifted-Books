const mongoose = require ('mongoose');

// const user = require('./Users.js');

const Books = mongoose.model('book, booksSchema'); //mongoose.model(<mongodb collection name>, our Schema) is the general default and it creates a collection inside of MongoDB that is named from the first arugment, books here. It applies the schema above to that collection. 

const booksSchema = new mongoose.Schema(
    {
        //creating a title that is a string, it is required and I cannot create 2 items that have the same title:
        title: {
            type: String,
            required: [true, "It must have a title!"],
            unique: true
        },

        //Making sure the author is a string and that if the user doesn't provide any author, the author will be "Anonymous" by default
        author:{
            type: String,
            default: "Anonymous"
        },

        //enum will allow us to manage the drop-down in our views by defining a set of the property so that only these properties are accepted by that field
        genre:{
            type: String,
            required: true
        },

        condition:{
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        //Making sure that the price is required. I could add a min and moax if we think that's appropriate too.

        price: {
            type: Number,
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {
        timestamps: true
    }
);


module.exports = Books; //making this available to all routes
