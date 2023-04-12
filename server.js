require('dotenv').config();
const express = require('express');
const app = express();

const { mongoose } = require('./config/connection');

app.get ('/', (req,res) => {
    res.send('hello world')
})


app.listen(process.env.PORT, () =>
    console.log(`📚Server is listening to PORT: ${process.env.PORT}🤓`)
);