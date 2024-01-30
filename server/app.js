const express = require('express')
const { connectToDb, getDb} = require('./db')
const cors = require('cors');

const app = express()
app.use(cors());


let db

connectToDb((err) => {
    if (!err) {
        app.listen(2000, () => {
            console.log('app listen on port 2000')
        })
        db = getDb()
    }
})


    
app.get('/students', async (req, res) => {
    try {
        const result = await db.collection('students').find().toArray();
        res.json(result);
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/workers', async (req, res) => {
    try {
        const result = await db.collection('workers').find().toArray();
        res.json(result);
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/courses', async (req, res) => {
    try {
        const result = await db.collection('courses').find().toArray();
        res.json(result);
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
