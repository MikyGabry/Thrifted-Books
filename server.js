require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const booksController = require('./controllers/books')
const usersController = require('./controllers/users')
const methodOverride = require('method-override')
const userController = require('express-session')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const { mongoose } = require('./config/connection');

app.set('view engine', 'ejs');

app.use(express.urlencoded ({ extended:false}));
app.use(methodOverride('_method'));

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.DATABASE_URL
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 2
        }
    })
)

app.get ('/', (req,res) => {
    res.render('home.ejs')
})

app.use('/books', booksController);
app.use('', usersController)
app.use(express.static('public'))

app.listen(process.env.PORT, () =>
    console.log(`📚Server is listening to PORT: ${process.env.PORT}🤓`)
);