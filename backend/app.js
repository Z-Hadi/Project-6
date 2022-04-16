// MongoDB mongodb+srv://Zaid:<password>@cluster0.ntc3r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//Mogon Password MEFfZKi4zYRgvwsg 


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');


const app = express();
mongoose.connect('mongodb+srv://Zaid:MEFfZKi4zYRgvwsg@cluster0.ntc3r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, x-requested-with, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', productRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;