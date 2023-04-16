/*2. CONTROLLERS: routing
Sets up the routing for each of the different topics or collections you have saved. 
Connects the models (which represent the data) to get the information it needs from Mongo and to the server to be run to the Views (which displays the data)
The controllers file typically contains a set of functions that handle specific HTTP requests (such as GET or POST) and interact with the models to retrieve or update data.

array destructuring: This means if I go to models/index.js, which is the file i'm requiring, I expect that it's exporting an object.
I only want the value of books from that object. 
It creates a variable books that's set to the value of the books key in the export for this file. 
*/

const express = require ('express');
const router = express.Router();

const {Books, Users} = require('../models') 

const seededData = [  //title, author, genre, condition, description, price, user  : Q: Do we obtain seeded data from MongoDB?
    {
        title: "",
        author: "",
        price: "",
        user: "",

    }
]

router.get('', async (req, res, next) =>{
    try{
        console.log (req.session)
        let myBooks;
        console.lofe(req.query);
        if (req.query.search) {
            myBooks = await Books.find({author: req.query.search})
            console.log(myBooks);
        } else{
            myBooks = await Books.find({});
            console.log(myBooks);
        }

        res.render('books.index', {books: myBooks})
    }

    catch(err){
        //if there is an error, it will fo to the catch block
        console.log(err);
        next();
    }

})








