require('dotenv').config();
const express = require('express');
const app = express();

const { mongoose } = require('./config/connection');

app.set('view engine', 'ejs');


app.get ('/', (req,res) => {
    res.render('home.ejs')
})


app.listen(process.env.PORT, () =>
    console.log(`📚Server is listening to PORT: ${process.env.PORT}🤓`)
);