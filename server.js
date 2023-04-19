require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const booksController = require('./controllers/books')

const { mongoose } = require('./config/connection');

app.set('view engine', 'ejs');


app.get ('/', (req,res) => {
    res.render('home.ejs')
})

app.use('/books', booksController);


app.listen(process.env.PORT, () =>
    console.log(`📚Server is listening to PORT: ${process.env.PORT}🤓`)
);