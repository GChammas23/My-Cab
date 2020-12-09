const { response, request } = require("express");
const { ObjectID } = require("mongodb");
let db = require("../database");

let client = db.getClient();
let collection = db.getRidesCollection();
let url = db.getUrl();
let databaseName = db.getDatabase();

exports.getUserReservations = (request, response) => {
    const { user_username } = request.body;

    console.log(user_username);

    client.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db(databaseName);
        dbo.collection(collection).find({ user_username: user_username, ride_date: { $gte: new Date() } }).toArray((err, result) => {
            if (err) {
                response.status(500).send({ message: "An error occured while fetching the rides", error: err });
            }
            else {
                response.status(200).send({ message: "Rides found successfully", res: result });
                console.log(result);
            }
        })
        db.close();
    });
};

exports.getUserRides = (request, response) => {
    const { user_username } = request.body;

    console.log(user_username);

    client.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db(databaseName);
        dbo.collection(collection).find({ user_username: user_username, ride_date: { $lte: new Date() } }).toArray((err, result) => {
            if (err) {
                response.status(500).send({ message: "An error occured while fetching the rides", error: err });
            }
            else {
                response.status(200).send({ message: "Rides found successfully", res: result });
                console.log(result);
            }
        })
        db.close();
    });
};

exports.getUserRidesPrices = (request, response) => {
    const { username } = request.body;

    client.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db(databaseName);

        dbo.collection(collection).find({ user_username: username }, {projection: {_id: 0, ride_price: 1}}).toArray((err, result) => {
            if (err) {
                response.status(500).send({ message: "Error occured while fetching price", error: err });
            }
            else {
                let formattedArray = [];
                for(let i = 0; i < result.length; i++){
                    formattedArray.push(result[i].ride_price);
                }
                response.status(200).send({ message: "Ride price found successfully!", res: formattedArray });
            }
        })
        db.close();
    })
};

exports.addRide = (request, response) => {
    const { user_username } = request.body;
    const { start_address } = request.body;
    const { destination_address } = request.body;
    const { ride_price } = request.body;
    const { ride_date } = request.body;

    let ride = {
        user_username: user_username,
        start_address: start_address,
        destination_address: destination_address,
        ride_price: ride_price,
        ride_date: new Date(ride_date),
    };

    client.connect(url, (err, db) => {
        if (err) throw err;

        let dbo = db.db(databaseName);
        dbo.collection(collection).insertOne(ride, (err, result) => {
            if (err) {
                response.status(500).send({ message: "An error occured while trying to add the ride", error: err });
            }
            else {
                response.status(200).send({ message: "Ride info added successfully!", res: result });
                console.log(result);
            }
        })
        db.close();
    });
}

exports.deleteReservation = (request, response) => {
    const { data } = request.body;

    console.log(data);

    client.connect(url, (err, db) => {
        if (err) throw err;

        let dbo = db.db(databaseName);
        dbo.collection(collection).deleteOne({ _id: ObjectID(data._id) }, (err, result) => {
            if (err) {
                response.status(500).send({ message: "An error occured while trying to delete the reservation", error: err });
            }
            else {
                response.status(200).send({ message: "Reservation successfully deleted", res: result });
                console.log(result);
            }
        })
        db.close();

    })
}

exports.deletAllUserData = (request, respone) => {
    const { username } = request.body;

    client.connect(url, (err, db) => {
        if (err) throw err;

        let dbo = db.db(databaseName);
        dbo.collection(collection).deleteMany({ user_username: username }, (err, result) => {
            if (err) {
                respone.status(500).send({ message: "An error occured while deleting the rides", error: err });
            }
            else {
                respone.status(200).send({ message: "User data successfully deleted!", res: result });
                console.log(result);
            }
        })
        db.close();
    })
}

exports.editUserReservation = (request, response) => {
    const { username } = request.body;
    const { start_address } = request.body;
    const { destination_address } = request.body;
    const { ride_price } = request.body;
    const { ride_date } = request.body;

    console.log(username);
    console.log(start_address);
    console.log(destination_address);
    console.log(ride_date);
    console.log(ride_price);

    client.connect(url, (err, db) => {
        if (err) throw err;

        let whereClause = { user_username: username };

        let newValues = { $set: { start_address: start_address, destination_address: destination_address, ride_price: ride_price, ride_date: ride_date } };

        let dbo = db.db(databaseName);
        dbo.collection(collection).updateOne(whereClause, newValues, (err, result) => {
            if (err) {
                response.status(500).send({ message: "An error occured while updating ride info ", error: err });
            }
            else {
                response.status(200).send({ message: "Ride info updated successfully! ", res: result });
            }
        })
        db.close();
    })
}