const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
    // res.send('Hello')
    res.render('users/login.ejs')
})

router.get('/signup', (req, res) => {
    res.render('users/signup.ejs')
})

router.post('/signup', async (req, res, next) => {
    try{
        const newUser = req.body;
        const rounds = process.env.SALT_ROUNDS;
        const salt = await bcrypt.genSalt(parseInt(rounds));
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        console.log(newUser)
        await User.create(newUser)
        res.redirect('/login')
    } catch(err) {
        console.log(err)
        next()
    }
})

router.post('/login', async (req, res, next) => {
    try{
        let user;
        const userExist = await User.exists({email: req.body.email})
        if (userExist) {
            user = await User.findOne({email: req.body.email})
        } else {
            return res.redirect('/login')
        }
        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            req.session.correntUser = {
                id: user._id,
                userName: user.userName
            }
            res.redirect('/books')
        } else {
            res.redirect('/login')
        }
    } catch(err) {
        console.log(err);
        next()
    }
})

module.exports = router;