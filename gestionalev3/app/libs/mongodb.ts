import { MongoClient } from "mongodb";


const uris = "mongodb+srv://gerrydag:Mulignan_1324@cluster0.g7jbh.mongodb.net/ansidonna";


const connectMongoDb = () => {
    try {
        MongoClient.connect(uris)
        console.log("Mongo dbconnected")
    } catch (err) {
        console.log(err)
    }
}



export default connectMongoDb


