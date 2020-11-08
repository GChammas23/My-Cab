var express = require('express');
var router = express.Router();

const prices = require('../services/prices.service');


router.get('/getPrices', prices.getPricings);
router.post('/getRidePrice', prices.getRidePrice);

module.exports = router