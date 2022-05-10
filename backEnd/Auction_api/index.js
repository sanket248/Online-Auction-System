const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

const productRoute = require('./Routes/productRoute');
const bidRoute = require('./Routes/bidRoute');
const userRoute = require('./Routes/userRoute.js');

// Setup static files path
app.use('/uploads', express.static('Uploads'));

app.get('/', (req, res) => 
    res.send('Hello Worlllllld!'))


// Connect MongoDB database
const dbpath = 'mongodb://127.0.0.1:27017/eAuctionDB';
const options = {useNewUrlParser:true, useUnifiedTopology:true}
const mongo = mongoose.connect(dbpath, options);
mongo.then(() => {
    console.log('DataBaseConnected');
}, error =>{
    console.log(error, 'error in database connection');
})


// Routes which should handle requests
app.use("/product", productRoute);
app.use("/bid", bidRoute);
app.use("/user", userRoute);

// Handle Error Requests
app.use((req, res, next) => {
    const error = new Error();
    error.message = 'Not Found';
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error
    });
});

module.exports = app;