const express = require('express')
const { connectToDb, getDb} = require('./db')
const cors = require('cors');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');



const app = express()
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db

connectToDb((err) => {
    if (!err) {
        app.listen(2000, () => {
            console.log('app listen on port 2000')
        })
        db = getDb()
    }
})


//GET CALL 

app.get('/:type', async (req, res) => {

    let type = req.params.type;
    try {
        const result = await db.collection(type).find().toArray();
        res.json(result);
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/:type/:id', async (req, res) => {
    try {
        let type = req.params.type;
        const courseId = req.params.id;
        const objectIdCourseId = new ObjectId(courseId);

        const result = await db.collection(type).findOne({ _id: objectIdCourseId });

        if (!result) {
            res.status(404).json({ error: `${type} not Found` });
            return;
        }

        res.json(result);
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//CHIAMATE POST

app.post('/add/:type/', async (req,res) => {
    try {
   
        datiUtente = req.body
        let type = req.params.type
        const collezione = db.collection(type);

        // Inserisci lo studente nella collezione
        await collezione.insertOne(datiUtente);

        res.status(200).json({ message: 'Dati ricevuti con successo', data: datiUtente });
    } catch (error) {
        console.error('Errore durante il salvataggio', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//aggiungi corso all'ente
app.post('/aggiungicorsoente/:ente_name/:corso_id', async (req, res) => {
    try {
       
       let ente_name = req.params.ente_name
       let corso_id = req.params.corso_id


        const collection = db.collection('enti');
        
        // Trova l'ente corrispondente per nome
        const ente = await collection.findOne({ nome: ente_name });

        if (!ente) {
            return res.status(404).json({ message: "Ente non trovato" });
        }

        // Aggiorna l'array corsi_id dell'ente trovato con il nuovo corsoId
        await collection.updateOne(
            { nome: ente_name },
            { $push: { corsi_id: corso_id } }
        );

        return res.json({ message: "ID corso aggiunto con successo", ente });
    } catch (error) {
        console.error("Errore durante l'aggiunta dell'ID corso:", error);
        return res.status(500).json({ message: "Errore durante l'aggiunta dell'ID corso" });
    }
});