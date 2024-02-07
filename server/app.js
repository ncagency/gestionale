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



//CHIAMATE POST v2

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

//aggiungi corso all'utente
app.post('/aggiungicorsoutente/:utente_id/:corso_id', async (req, res) => {
    try {
       
       let utente_id = new ObjectId(req.params.utente_id)
       let corso_id = req.params.corso_id


        const collection = db.collection('students');
        
        const studente = await collection.findOne({ _id: new ObjectId(utente_id) });

        if (!studente) {
            return res.status(404).json({ message: "Studente non trovato" });
        }

        // Aggiorna l'array corsi_id dell'ente trovato con il nuovo corsoId
        await collection.updateOne(
            { _id: new ObjectId(utente_id) },
            { $push: { courses_id: corso_id } }
        );

        return res.json({ message: "ID corso aggiunto con successo", studente });
    } catch (error) {
        console.error("Errore durante l'aggiunta dell'ID corso:", error);
        return res.status(500).json({ message: "Errore durante l'aggiunta dell'ID corso" });
    }
});

//aggiorna rata
app.post('/edit/rate/:id/:index', async (req, res) => {
    try {
      const studentId = new ObjectId(req.params.id);
      const rateIndex = parseInt(req.params.index);
      const updatedRate = req.body;
  
      // Recupera il documento dello studente dal database
      const student = await db.collection('students').findOne({ _id: studentId });
  
      if (!student) {
        return res.status(404).json({ error: 'Studente non trovato' });
      }
  
      // Determina il valore della rata pagata
      const rateValue = parseFloat(updatedRate.valorerata);
  
      // Calcola i nuovi valori per i campi 'payments.totale', 'payments.saldati', 'payments.in_sospeso'
      

      // Calcola i nuovi valori per i campi 'payments.totale', 'payments.saldati', 'payments.in_sospeso'
        let newSaldati = student.payments.saldati;
        let newSospesi = student.payments.in_sospeso;
        let newTotale = student.payments.totale;

        if (updatedRate.pagata) {
        // Se la rata è stata contrassegnata come pagata, aggiungi il valore a 'saldati' e sottrai da 'in_sospeso'
        newSaldati += rateValue;
        newSospesi -= rateValue;
        } else {
        // Se la rata non è stata pagata, aggiungi il valore a 'in_sospeso' e sottrai da 'saldati'
        newSaldati -= rateValue;
        newSospesi += rateValue;
        }


      // Aggiorna lo stato della rata e i dati relativi al pagamento
      const result = await db.collection('students').updateOne(
        { 
          _id: studentId,
          'payments.rate.valorerata': updatedRate.valorerata
        },
        { 
          $set: { 
            ['payments.rate.' + rateIndex + '.datascadenza']: updatedRate.datascadenza, 
            ['payments.rate.' + rateIndex + '.pagata']: updatedRate.pagata,
            'payments.in_sospeso': newSospesi,
            'payments.saldati': newSaldati,
            'payments.totale': newTotale
          }
        }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Studente non trovato o rata non trovata' });
      }
  
      res.json({ message: 'Rata aggiornata con successo e valore scalato dal totale' });
    } catch (error) {
      console.error('Errore durante l\'aggiornamento della rata e scalare il valore dal totale:', error);
      res.status(500).json({ error: 'Si è verificato un errore durante l\'aggiornamento della rata e scalare il valore dal totale' });
    }
  });
  