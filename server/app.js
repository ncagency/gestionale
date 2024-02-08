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

app.get('/contabile/:type/:id', async (req, res) => {
    try {
        let type = req.params.type;
        const id = req.params.id;

        const result = await db.collection('contabile').findOne({});

        if (!result) {
            res.status(404).json({ error: `${type} not Found` });
            return;
        }

        let item;
        if (type === 'courses') {
            item = result.courses.find(course => course._id === id);
        } else if (type === 'enti') {
            item = result.enti.find(ente => ente._id === id);
        } else if (type === 'students') {
            item = result.students.find(student => student._id === id);
        } else {
            res.status(400).json({ error: `Invalid type ${type}` });
            return;
        }

        if (!item) {
            res.status(404).json({ error: `${type} with ID ${id} not found` });
            return;
        }

        res.json(item);
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//CHIAMATE POST v2


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
        const collection_corsi = db.collection('courses');



        const studente = await collection.findOne({ _id: new ObjectId(utente_id) });
        if (!studente) {
            return res.status(404).json({ message: "Studente non trovato" });
        }

        // Aggiorna l'array corsi_id dell'ente trovato con il nuovo corsoId
        await collection.updateOne(
            { _id: new ObjectId(utente_id) },
            { $push: { corsi: corso_id } }
        );
        
        const corso = await collection_corsi.findOne({ _id: new ObjectId(corso_id) });
        if (!corso) {
            return res.status(404).json({ message: "Corso non trovato" });
        }

        await collection_corsi.updateOne(
            { _id: new ObjectId(corso_id) },
            { $push: { utenti: utente_id } }
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
  

//POST V3

//add ente
app.post('/add/ente/', async (req,res) => {

    try {
   
        enteData = req.body
        const collezione = db.collection('enti');
        const coll_contabile = db.collection('contabile');

        // Inserisci lo studente nella collezione
        await collezione.insertOne(enteData);

        res.status(200).json({ message: 'Dati ricevuti con successo', data: enteData });
        ente_id = enteData._id.toString()
        ente_name = enteData.nome
        let ente_contabile = {
            _id:ente_id,
            nome:ente_name,
            totale:0,
            inviati:0,
            da_inviare:0
          }
        
        // Aggiorna l'array 'enti' nell'unico oggetto nella collezione 'contabile'
        await coll_contabile.updateOne(
        {}, // Filtra l'aggiornamento sull'oggetto principale (senza alcun filtro)
        { $push: { enti: ente_contabile } } // Aggiungi 'ente_contabile' all'array 'enti  
    )
    } catch (error) {
        console.error('Errore durante il salvataggio', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//addcorso
app.post('/add/corso/', async (req,res) => {

    try {
   
        corsoData = req.body
        const collezione = db.collection('courses');
        const coll_contabile = db.collection('contabile');

        await collezione.insertOne(corsoData);

        res.status(200).json({ message: 'Dati ricevuti con successo', data: corsoData });
        corso_id = corsoData._id.toString()
        corso_name = corsoData.nome
        let corso_contabile = {
            _id:corso_id,
            name:corso_name,
            costo:0,
            stock:0,
            venduti:0,
            totale_entrate:0,
            totale_uscite:0,
            totale_profit:0
          }
        
       
        await coll_contabile.updateOne(
        {}, 
        { $push: { corsi: corso_contabile } }
    )
    } catch (error) {
        console.error('Errore durante il salvataggio', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//addstudent
app.post('/add/student/', async (req,res) => {

    try {
   
        studentData = req.body
        const collezione = db.collection('students');
        const coll_contabile = db.collection('contabile');

        await collezione.insertOne(studentData);

        res.status(200).json({ message: 'Dati ricevuti con successo', data: studentData });
        student_id = studentData._id.toString()
        let student_contabile = {
            _id:student_id,
            totale:0,
            saldati:0,
            in_sospeso:0,
            rate:[]
          }
        
       
        await coll_contabile.updateOne(
        {}, 
        { $push: { students: student_contabile } }
    )
    } catch (error) {
        console.error('Errore durante il salvataggio', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})






//delete
app.delete('/elimina/:type/:id', async (req, res) => {
    try {
        const type = req.params.type;
        const id = new ObjectId(req.params.id);
        
        if (type === 'courses') {
            collection2 = db.collection('courses');

            
        } else if (type === 'enti') {
            collection2 = db.collection('enti');


        } else if (type === 'students') {
        
            collection2 = db.collection('courses');
            const courses = await collection2.find({ utenti: id }).toArray();
            for (const course of courses) {
                await collection2.updateOne(
                    { _id: new ObjectId(course._id) },
                    { $pull: { utenti: id } }
                );
            }


       let collection = db.collection(type);
       const result = await collection.deleteOne({ _id: id });

       if (result.deletedCount === 0) {
           res.status(404).json({ error: `${type} with ID ${id} not found` });
           return;
       }
       
       res.json({ message: `${type} with ID ${id} deleted successfully` });     

        } else {
            res.status(400).json({ error: `Invalid type ${type}` });
            return;
        }
                
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

