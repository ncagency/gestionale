const { MongoClient} = require('mongodb');

const uri = "mongodb+srv://gerrydag:Mulignan_1324@cluster0.g7jbh.mongodb.net/ansidonna";


export async function connectToDatabase() {
    const client = new MongoClient(uri);

    try {
        // Connessione al client MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Ritorna il riferimento al database
        return client.db();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

