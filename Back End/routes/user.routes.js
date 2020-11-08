
var express = require('express');
var router = express.Router();

const users = require('../services/user.service');

router.post('/addUser', users.create);
router.get('/users', users.getUsers);
router.post('/user', users.getUser);
router.post('/deleteUser', users.deleteUser);
router.post('/updatePass', users.updatePass);


module.exports = router