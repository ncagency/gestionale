const { MongoClient } = require('mongodb');

let dbConnection

const uris = "mongodb+srv://gerrydag:Mulignan_1324@cluster0.g7jbh.mongodb.net/ansidonna";

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uris)
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}