const { MongoClient } = require('mongodb');

let dbConnection

const uris = "mongodb://51.210.108.56:27017/ansidonna";

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