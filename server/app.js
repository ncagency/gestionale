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
app.post('/aggiungicorsoente/:ente_id/:corso_id', async (req, res) => {
    try {
       
        let ente_id = new ObjectId(req.params.ente_id)
        let corso_id = req.params.corso_id
 
 
         const collection = db.collection('enti');
         const collection_corsi = db.collection('courses');
 
 
 
         const ente = await collection.findOne({ _id: new ObjectId(ente_id) });
         if (!ente) {
             return res.status(404).json({ message: "Ente non trovato" });
         }
 
         // Aggiorna l'array corsi_id dell'ente trovato con il nuovo corsoId
         await collection.updateOne(
             { _id: new ObjectId(ente_id) },
             { $push: { corsi: corso_id } }
         );
         
         const corso = await collection_corsi.findOne({ _id: new ObjectId(corso_id) });
         if (!corso) {
             return res.status(404).json({ message: "Corso non trovato" });
         }
 
         await collection_corsi.updateOne(
             { _id: new ObjectId(corso_id) },
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
    let responseSent = false; // Variabile per tenere traccia se la risposta è già stata inviata

    try {
        const corsoData = req.body;
        const collezione = db.collection('courses');
        const coll_contabile = db.collection('contabile');
        const coll_ente = db.collection('enti');

        let ente_nome = corsoData.ente;
        // Inserisci i dati del corso nella collezione 'courses'
        await collezione.insertOne(corsoData);

        // Aggiorna un elemento nella collezione 'contabile'
        const corso_id = corsoData._id.toString();
        const corso_name = corsoData.nome;
        const corso_contabile = {
            _id: corso_id,
            name: corso_name,
            costo: 0,
            stock: 0,
            venduti: 0,
            totale_entrate: 0,
            totale_uscite: 0,
            totale_profit: 0
        };

        // Aggiungi il corso_contabile nella collezione 'contabile'
        await coll_contabile.updateOne(
            {}, 
            { $push: { courses: corso_contabile } }
        );

        // Trova il documento dell'ente corrispondente al nome
        const ente = await coll_ente.findOne({ nome: ente_nome });
        
        if (ente) {
            // Aggiungi il corso ai dati dell'ente nella collezione 'ente'
            await coll_ente.updateOne(
                { nome: ente_nome }, 
                { $push: { corsi: corsoData._id } }
            );

            // Invia la risposta solo se non è stata inviata precedentemente
            if (!responseSent) {
                res.status(200).json({ message: 'Dati ricevuti con successo', data: corsoData._id });
                responseSent = true; // Imposta la variabile a true per indicare che la risposta è stata inviata
            }
        } else {
            // Se non esiste un documento per l'ente, gestisci l'errore di conseguenza
            throw new Error(`Ente con nome ${ente_nome} non trovato`);
        }
    } catch (error) {
        // Gestione degli errori
        console.error('Errore durante il salvataggio', error);
        // Invia una risposta di errore solo se non è stata inviata precedentemente
        if (!responseSent) {
            res.status(500).json({ error: 'Internal Server Error' });
            responseSent = true; // Imposta la variabile a true per indicare che la risposta è stata inviata
        }
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
app.delete('/elimina/students/:id', async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        
        //aggiorna in courses
        collection2 = db.collection('courses');
        const courses = await collection2.find({ utenti: id }).toArray();
        for (const course of courses) {
        await collection2.updateOne(
                    { _id: new ObjectId(course._id) },
                    { $pull: { utenti: id } }
)}
        
         //aggiorna in array contabilità
         let collection_contabile = db.collection('contabile');

         // Trova gli oggetti contabilità che contengono l'ID del corso
         const students = await collection_contabile.find({ "students._id": req.params.id }).toArray();
         // Loop attraverso gli oggetti contabilità
         for (const student of students) {
             // Utilizza il metodo $pull per rimuovere l'oggetto corso dall'array courses
             await collection_contabile.updateOne(
                 { _id: student._id },
                 { $pull: { students: { _id: req.params.id } } } // Utilizza il riferimento corretto all'ID del corso
             );
         }



       let collection = db.collection('students');
       const result = await collection.deleteOne({ _id: id });

       if (result.deletedCount === 0) {
           res.status(404).json({ error: `Students with ID ${id} not found` });
           return;
       }
       
       res.json({ message: `Students with ID ${id} deleted successfully` });     

                
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/elimina/courses/:id', async (req, res) => {
    try {
        const id = req.params.id


        //aggiorna in array studenti
        collection2 = db.collection('students');        
        const users = await collection2.find({ corsi: id }).toArray();
        for (const user of users) {
        await collection2.updateOne(
                 { _id: user._id },
                 { $pull: { corsi: id } }
            );
       }

        //aggiorna in array contabilità
        let collection_contabile = db.collection('contabile');

        // Trova gli oggetti contabilità che contengono l'ID del corso
        const corsi = await collection_contabile.find({ "courses._id": id }).toArray();
        // Loop attraverso gli oggetti contabilità
        for (const corso of corsi) {
            // Utilizza il metodo $pull per rimuovere l'oggetto corso dall'array courses
            await collection_contabile.updateOne(
                { _id: corso._id },
                { $pull: { courses: { _id: id } } } // Utilizza il riferimento corretto all'ID del corso
            );
        }

       //aggiorna in array enti
        let collection = db.collection('courses');
        collection3 = db.collection('enti')
        const corso = await collection.findOne({ _id:  new ObjectId(id)})
        // Trova il documento nella collezione e ottieni l'oggetto su cui chiamare updateOne()
        const ente = await collection3.findOne({ nome: corso.ente });

        // Assicurati che il documento sia stato trovato prima di chiamare updateOne()
        if (ente) {
            // Esegui l'aggiornamento sul documento trovato
            await collection3.updateOne(
                { _id: ente._id }, // Utilizza l'ID del documento trovato
                { $pull: { corsi: new ObjectId(id) } }
            );
            console.log("Corso rimosso dall'ente correttamente.");
        } else {
            console.log("Ente non trovato.");
        }
       
       

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          res.status(404).json({ error: `Courses with ID ${id} not found` });
        return;
       }
       
        res.json({ message: `Courses  with ID ${id} deleted successfully` });     

                
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




//update
app.put('/update/:type/:id', async (req, res) => {
    const { type, id } = req.params;
    const updateData = req.body;
    delete updateData._id;

    try {
   
      // Effettua l'aggiornamento del record nella collezione corrispondente
      const result = await db.collection(type).updateOne(
        { _id: new ObjectId(id) }, // Converti l'ID in un ObjectId
        { $set: updateData } // Aggiorna i dati
      );
    
    if (!result.value) {
        return res.status(404).json({ message: "Record non trovato" });
      }

      return res.status(200).json(result.value);
     
    
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dello studente:', error);
      return res.status(500).json({ message: 'Errore durante l\'aggiornamento dello studente' });
    }
  });