var express = require('express');
var router = express.Router();

const rides = require('../services/rides.service');


router.post('/getReservations', rides.getUserReservations);
router.post('/deleteReservation', rides.deleteReservation);
router.post('/addRide', rides.addRide);
router.post('/deleteUserData', rides.deletAllUserData);
router.post('/updateReservation', rides.editUserReservation);
router.post('/getRides', rides.getUserRides);
router.post('/getUserRidesPrices', rides.getUserRidesPrices);

module.exports = router