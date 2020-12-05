let db = require("../database");

let client = db.getClient();
let collection = db.getPricingsCollection();
let url = db.getUrl();
let databaseName = db.getDatabase();

exports.getPricings = (request, response) => {
    client.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db(databaseName);
        dbo.collection(collection).find({}).toArray((err, result) => {
            if (err) {
                response.status(500).send({ message: "Error occured while fetching prices", error: err });
            }
            else {
                response.status(200).send({ message: "Pricings found successfully!", res: result });
                console.log(result);
            }
        });
        db.close();
    });
}

exports.getRidePrice = (request, response) => {
    const { start } = request.body;
    const { dest } = request.body;

    client.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db(databaseName);

        dbo.collection(collection).find({ start_address: start, dest_address: dest }).toArray((err, result) => {
            if (err) {
                response.status(500).send({ message: "Error occured while fetching price", error: err });
            }
            else {
                response.status(200).send({ message: "Ride price found successfully!", res: result });
            }
        })
        db.close();
    })
}