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

const {Books} = require('../models') 

const seededBooksData = [  //title, author, genre, condition, description, price, user  : Q: Do we obtain seeded data from MongoDB?
    {
        title: "Jane Eyre",
        author: "Charlotte Bronte",
        price: "16.99",
        genre: "Fiction",
        condition: "New",
        description: "Novel",
        user: ""

    },
    {
        title: "Hunger Games",
        author: "Suzanne Collins",
        price: "20.99",
        genre: "Faction",
        condition: "New",
        description: "Novel",
        user: ""

    },
    {
        title: "The Wife",
        author: "Alafair Burke",
        price: "19.99",
        genre: "Faction",
        condition: "New",
        description: "Novel",
        user: ""

    }
]

router.get('', async (req, res, next) =>{
    try{
        const myBooks = await Books.find({})
        res.render('books/index', {books: myBooks})
    } catch(err) {
        //if there is an error, it will fo to the catch block
        console.log(err);
        next();
    }
})

router.get('/new', (req, res) => {
    res.render('books/new.ejs')
    // res.send(`Here are all the books`)
})

router.get('/seeds', async (req, res, next) => {
    try {
        await Books.deleteMany({});
        await Books.insertMany(seededBooksData);
        res.redirect('/')
    }catch(err) {
        console.log(err)
        next()
    }
})

router.get('/:id/edit', async (req, res, next) => {
    try {
        const bookToBeUpdated = await Books.findById(req.params.id);
        console.log(bookToBeUpdated);
        res.render('books/edit.ejs', {book: bookToBeUpdated})
    } catch(err) {
        console.log(err);
        next()
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const myBook = await Books.findById(req.params.id)
        res.render('books/show.ejs', {book: myBook})
    } catch(err) {
        console.log(err)
        next()
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        console.log(req.params.id)
        const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body);
        res.render('books/edit.ejs', {book: updatedBook})
    } catch(err) {
        console.log(err);
        next();
    }
})

router.get('/:id/delete', async (req, res, next) => {
    try {
        const bookForTrash = await Books.findById(req.params.id);
        res.render('books/delete.ejs', {book: bookForTrash})
    } catch(err) {
        console.log(err);
        next();
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Books.findByIdAndDelete(req.params.id);
        res.redirect('/books');
    } catch(err) {
        console.log(err);
        next();
    }
})

module.exports = router;






