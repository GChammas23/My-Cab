var express = require('express');
var router = express.Router();

const rides = require('../services/rides.service');


router.post('/getRides', rides.getUserRides);
router.post('/deleteReservation', rides.deleteReservation);
router.post('/addRide', rides.addRide);
router.post('/deleteUserData', rides.deletAllUseData);
router.post('/updateReservation', rides.editUserReservation);

module.exports = router