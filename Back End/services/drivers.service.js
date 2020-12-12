let db = require("../database");

let client = db.getClient();
let collection = db.getDriversCollection();
let url = db.getUrl();
let databaseName = db.getDatabase();

exports.getAllDrivers = (request, response) => {
    client.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db(databaseName);
        dbo.collection(collection).find({}).toArray((err, result) => {
            if (err) {
                response.status(500).send({ message: "Error occured while fetching drivers", error: err });
            }
            else {
                response.status(200).send({ message: "Drivers found successfully!", res: result });
            }
        });
        db.close();
    });
}