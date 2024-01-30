const express = require('express')
const { connectToDb, getDb} = require('./db')
const cors = require('cors');
const { ObjectId } = require('mongodb');

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

app.get('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        
        // Assicurati che il parametro _id sia un ObjectId
        const objectIdStudentId = new ObjectId(studentId);

        const result = await db.collection('students').findOne({ _id: objectIdStudentId });

        if (!result) {
            res.status(404).json({ error: 'Student not found' });
            return;
        }

        res.json(result);
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/workers/:id', async (req, res) => {
    try {
        const workerId = req.params.id;
        
        // Assicurati che il parametro _id sia un ObjectId
        const objectIdWorkerId = new ObjectId(workerId);

        const result = await db.collection('workers').findOne({ _id: objectIdWorkerId });

        if (!result) {
            res.status(404).json({ error: 'Worker not found' });
            return;
        }

        res.json(result);
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});