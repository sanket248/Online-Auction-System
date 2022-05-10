const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')

// signup (create user)
router.post('/signup', UserController.signUp);
// login
router.post('/login', UserController.login);
// edit user
router.put('/edit/:userid', UserController.editUser);
// get user
router.get('/getuser/:userid', UserController.getUser);

module.exports = router;