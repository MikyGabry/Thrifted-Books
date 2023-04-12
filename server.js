require('dotenv').config();
const express = require('express');
const app = express();

app.get ('/', (req,res) => {
    res.send('default route test 2')
})


app.listen(process.env.PORT, () =>
    console.log(`📚Server is listening to PORT: ${process.env.PORT}🤓`)
);