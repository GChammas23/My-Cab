var express = require('express');
var router = express.Router();

const drivers = require('../services/drivers.service');


router.get('/getDrivers', drivers.getAllDrivers);

module.exports = router