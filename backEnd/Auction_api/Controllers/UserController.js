const mongoose = require('mongoose');
const User = require('../Models/userModel');

// create a user
exports.signUp = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length > 0){
            const error = new Error();
            error.message = 'User Exists!';
            throw error;
        }
        else{
            const new_user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                address: req.body.address
            });
            return new_user.save();
        }
    })
    .then(result => {
        return res.status(201).json({
            message: "User is created successfully!!"
        })
    })
    .catch((error) => {
        next(error);
    });
};

// find a user and return it
exports.login = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length == 0){
            const error = new Error();
            error.message = 'Email Id Incorrect!';
            throw error;
        }
        else if(user[0].password != req.body.password){
            const error = new Error();
            error.message = 'Password Incorrect!';
            throw error;
        }
        else{
            return res.status(201).json(user[0]);
        }
    })
    .catch((error) => {
        next(error);
    });
};

// edit user based on userId
exports.editUser = (req, res, next) => {
    User.find({_id : req.params.userid})
    .exec()
    .then(user => {
        if(user.length == 0){
            const error = new Error();
            error.message = 'User Not Found!';
            throw error;
        }
        else{
            user[0].name = req.body.name;
            user[0].password = req.body.password;
            user[0].phone = req.body.phone;
            user[0].address = req.body.address;

            user[0].save();
            return res.status(201).json(user[0]);
        }
    })
    .catch((error) => {
        next(error);
    });
};

// get user based on userId
exports.getUser = (req, res, next) => {
    User.find({_id : req.params.userid})
    .exec()
    .then(user => {
        if(user.length == 0){
            const error = new Error();
            error.message = 'User Not Found!';
            throw error;
        }
        else{
            return res.status(201).json(user[0]);
        }
    })
    .catch((error) => {
        next(error);
    });
};