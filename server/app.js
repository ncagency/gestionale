const express = require('express')
const { connectToDb, getDb} = require('./db')

const app = express()


let db

connectToDb((err) => {
    if (!err) {
        app.listen(2000, () => {
            console.log('app listen on port 2000')
        })
        db = getDb()
    }
})


    
app.get('/', async (req, res) => {
    try {
        const result = await db.collection('users').find().toArray();
        res.json(result);
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


