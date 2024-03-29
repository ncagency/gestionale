const express = require('express')
const { connectToDb, getDb} = require('./db')
const cors = require('cors');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { Console } = require('console');


const app = express()
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db



connectToDb((err) => {
    if (!err) {
        db = getDb()
        app.listen(2000, () => {
            console.log('app listen on port 2000')
          cron.schedule('0 7 * * *', () => {
                controllaDataEInviaEmail();
        });
        })
        
     
       
    }
})   

//email transporter
const my_email = "gerardo.dagostino12@gmail.com"
const my_password = "twlz odnu hmjp bexf"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: my_email,
      pass: my_password
    }
  });


// Funzione per inviare l'email
function inviaEmail(destinatario, messaggio) {



    
    const mailOptions = {
      from: my_email,
      to: destinatario,
      subject: 'Scadenza Rata',
      text: messaggio
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Errore nell\'invio dell\'email:', error);
      } else {
        console.log('Email inviata con successo:', info.response);
      }
    });
  }
  
const controllaDataEInviaEmail = async () => {
    try {

  
        const oggi = new Date().toISOString().slice(0, 10);
        const contabileDocument = await db.collection('contabile').findOne({});
       
        students = contabileDocument.students
       
        students.map((student) => { 

            const destinatario = student.email
            student.rate.map((rata) => (
                rata.map((singola) => {
                    
                    const value = singola.valore
                    const data = singola.data
                    const stato = singola.pagata
                    const messaggio = `Devi paga ${value} OOOOo `


                    if (data === oggi && stato != true) { //metti true
                        inviaEmail(destinatario, messaggio);
                      } 



                })
            )) 
            
            })
        
    } catch (error) {
        console.error('Errore ', error);
    }
    
  }
  
  // Esegui la funzione ogni giorno a mezzanotte



// Middleware per gestire l'upload dei file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id = req.body.id;
    const uploadPath = `images/${id}`;
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    if ( file.fieldname === 'image_front' || file.fieldname === 'image_retro') {
        const fileName = file.fieldname === 'image_front' ? 'fronte.jpg' : 'retro.jpg';
        cb(null, fileName);
    } else {
        const fileName =  `${file.fieldname}.jpg`
        cb(null, fileName);
    }

  }
});

const upload = multer({ storage });


//API

app.get('/ciao', (req,res) => {
    res.send("Wewe");
})

// Endpoint per l'upload dell'immagine
app.post('/upload', upload.fields([{ name: 'image_front', maxCount: 1 }, { name: 'image_retro', maxCount: 1 }]), async (req, res) => {
    const id = req.body.id;
    const data = req.body

    try {
        const collection = db.collection('students');
        const student = await collection.findOne({ _id: new ObjectId(id) });


        if (!student) {
            res.status(404).json({ error: `Studente non trovato con ID: ${id}` });
            return;
        }

        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { 
                "docs.doc_type": data.doc_type ,
                "docs.n_doc": data.n_doc ,
                "docs.l_doc": data.l_doc,
                "docs.city_doc": data.city_doc, 
                "docs.state_doc": data.state_doc,  
                "docs.emi": data.emi,  
                "docs.scad": data.scad,  
            } }
        );

        res.json({ message: 'Immagini caricate con successo e parametri dello studente aggiornati', id: id });
    } catch (error) {
        console.error('Errore durante la ricerca dello studente o l\'aggiornamento dei parametri:', error);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

app.post('/upload_other', upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
      
    let id = req.body.id
    const file = req.files['image'][0]; // Accedi al file caricato
    

    if (!file) {
        res.status(400).json({ error: 'Nessun file inviato' });
        return;
    }

    const uploadPath = path.join(__dirname, 'images', id); // Percorso della cartella di destinazione
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Crea la cartella se non esiste già
    }

    const fileName = `${file.originalname}.jpg`;

    // Sposta il file nella cartella di destinazione
    fs.renameSync(file.path, path.join(uploadPath, fileName));
    res.json({ message: 'Immagine caricata con successo', id: id });
});

app.post('/upload_fatture', upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {

    let id = req.body.id
    let costo = Math.round(parseFloat(req.body.costo) * 100) / 100;
    
    const file = req.files['image'][0]; // Accedi al file caricato
    

    if (!file) {
        res.status(400).json({ error: 'Nessun file inviato' });
        return;
    }

    const uploadPath = path.join(__dirname, 'images', id); // Percorso della cartella di destinazione
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Crea la cartella se non esiste già
    }

    const fileName = `ft_${file.originalname}.jpg`;

    // Sposta il file nella cartella di destinazione
    fs.renameSync(file.path, path.join(uploadPath, fileName));

    try {
        const collection = db.collection('contabile');
        const contabile = await collection.findOne({});

        if (!contabile) {
            res.status(404).json({ error: `Non trovato ` });
            return;
        }

        const ente = contabile.enti.find(ente => ente._id === id);
        
        
        const inviati = Math.round(parseFloat(ente.inviati) * 100) / 100 + costo
        const da_inviare = Math.round(parseFloat(ente.da_inviare) * 100) / 100 - costo


        await collection.updateOne(
            {},
            {
              $set: {
                    "enti.$[ente].inviati": inviati,
                    "enti.$[ente].da_inviare":da_inviare,
                    },
                },
              {arrayFilters: [
                { "ente._id": id },
            ]} 
    
        );
        res.json({ message: 'Immagini caricate con successo e parametri dello studente aggiornati', id: id });
    } catch (error) {
        console.error('Errore durante la ricerca dello studente o l\'aggiornamento dei parametri:', error);
        res.status(500).json({ error: 'Errore interno del server' });
    }

});



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



app.get('/contabile', async (req, res) => {
    try {
        const result = await db.collection('contabile').findOne({})
        res.json(result);
    } catch (error) {
        console.error('Errore durante la query al database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/get/s/cronologia', async (req, res) => {
    try {
        const result = await db.collection('contabile').findOne({});
        const cronologia = result.cronologia_transazioni

        res.json(cronologia);
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

app.get('/api/files/:userId', (req, res) => {
    const userId = req.params.userId;
    const userFolderPath = path.join(__dirname, 'images', userId);
  
    // Verifica se la cartella dell'utente esiste
    if (fs.existsSync(userFolderPath)) {
      // Leggi i nomi dei file nella cartella dell'utente
      fs.readdir(userFolderPath, (err, files) => {
        if (err) {
          console.error('Errore durante la lettura della cartella dell\'utente:', err);
          return res.status(500).json({ error: 'Errore durante la lettura dei file dell\'utente' });
        }
        // Invia i nomi dei file al client
        res.json({ fileNames: files });
      });
    } else {
      // Se la cartella dell'utente non esiste, restituisci un errore 404
      res.status(404).json({ error: 'Cartella dell\'utente non trovata' });
    }
  });

// Definisci l'endpoint per il download dei file
app.get('/api/files/:userId/:fileName', (req, res) => {
    const userId = req.params.userId;
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'images', userId, fileName);
  
    // Verifica se il file esiste
    if (fs.existsSync(filePath)) {
      // Esegui il download del file
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error('Errore durante il download del file:', err);
          res.status(500).json({ error: 'Errore durante il download del file' });
        }
      });
    } else {
      // Se il file non esiste, restituisci un errore 404
      res.status(404).json({ error: 'File non trovato' });
    }
  });





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
app.post('/edit/rate/:studentId/:rateIndex/:debitoIndex', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const rateIndex = req.params.rateIndex;
        const debtIndex = req.params.debitoIndex;
        const updatedRate = req.body;

        // Trova il documento contabile che contiene gli studenti
        const contabileDocument = await db.collection('contabile').findOne({});

        if (!contabileDocument) {
            return res.status(404).json({ error: 'Documento contabile non trovato' });
        }

        // Trova lo studente all'interno dell'array 'students' con l'ID specificato
        const studentToUpdate = contabileDocument.students.find(student => student._id === studentId);

        if (!studentToUpdate) {
            return res.status(404).json({ error: 'Studente non trovato' });
        }

        // Verifica se la rata è stata effettivamente modificata
        const originalRate = studentToUpdate.rate[debtIndex][rateIndex];
        const isRateModified = JSON.stringify(updatedRate) !== JSON.stringify(originalRate);

        // Aggiorna la rate desiderata all'interno dell'array delle rate dello studente
        studentToUpdate.rate[debtIndex][rateIndex] = updatedRate;

        let saldati = studentToUpdate.saldati;
        let in_sospeso = studentToUpdate.totale - saldati;

        // Aggiorna i valori solo se la rata è stata modificata
        if (isRateModified) {
            const value = Math.round(parseFloat(updatedRate.valore) * 100) / 100;
            if (updatedRate.pagata == true) {
                saldati += value;
            } else {
                saldati -= value;
            }
            in_sospeso = studentToUpdate.totale - saldati;
        }

        // Aggiorna il documento contabile nel database
        await db.collection('contabile').updateOne(
            {},
            {
                $set: {
                    "students": contabileDocument.students,
                }
            });

        // Aggiorna i valori saldati e in_sospeso nel documento contabile
        await db.collection('contabile').updateOne(
            {},
            {
                $set: {
                    "students.$[student].saldati": saldati,
                    "students.$[student].in_sospeso": in_sospeso,
                }
            },
            {
                arrayFilters: [
                    { "student._id": studentId },
                ]
            });

        res.json({ message: 'Rate aggiornate con successo' });
    } catch (error) {
        console.error('Errore durante l\'aggiornamento delle rate:', error);
        res.status(500).json({ error: 'Si è verificato un errore durante l\'aggiornamento delle rate' });
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
            rate:[],
            email: studentData.email
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

app.put('/stock/:courseId', async (req, res) => { // Modifica il percorso per includere l'ID del corso
    try {
        const courseId = req.params.courseId; // Ottieni l'ID del corso dai parametri della richiesta
        const data = req.body;
        const coll_contabile = await db.collection('contabile');
     
        
        const contabile = await coll_contabile.findOne({});
        const enteTrovato =  contabile.enti.find(ente => ente.nome === data.ente);
        const corsoTrovato =  contabile.courses.find(corso => corso._id === courseId); // Utilizza l'ID del corso estratto dai parametri della richiesta


        let stock = corsoTrovato.stock + parseInt(data.stock)
        let costo = corsoTrovato.costo  +  Math.round(parseFloat(data.costo) * 100) / 100;
        let tot = stock * costo
        let totale_ente = enteTrovato.totale + tot
        let da_inviare = enteTrovato.da_inviare + tot

        let uscite = corsoTrovato.totale_uscite + tot

        let cronologia = {ente_id: enteTrovato._id, ente_name: enteTrovato.nome, corso_id: corsoTrovato._id, corso_nome: corsoTrovato.name, n_stock: stock, prezzo: costo, inviati: tot,data: data.data, type:"inv" }

        await coll_contabile.updateOne(
            {},
            { 
              $push:{"cronologia_transazioni":cronologia},
              $set: { "enti.$[ente].totale": totale_ente ,
                    "enti.$[ente].da_inviare": da_inviare,
                    "courses.$[course].stock":stock,
                    "courses.$[course].costo":costo,
                    "courses.$[course].totale_uscite":uscite,
                 },
              
                },
              {arrayFilters: [
                { "ente.nome": data.ente },
                { "course._id": courseId } // Utilizza l'ID del corso estratto dai parametri della richiesta
            ]} )
        
        res.status(200).send('Dati aggiornati con successo'); // Invia una risposta di successo
    } catch (error) {
        console.error('Errore durante il salvataggio', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.post('/iscrizione', async (req,res) => {
    try {
       
    data = req.body
 
    let utente_id = data.user_id
    let corso_id = data.course_id

    const collection = db.collection('students');
    const collection_corsi = db.collection('courses');
    const collection_contabile = db.collection('contabile');


   
    console.log(data.rate)

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
    
    let nrate = data.rate.length
    

    const contabile = await collection_contabile.findOne({})
    
    const studente_contabile = contabile.students.find(studente => studente._id === utente_id);
    let student_totale =  (Math.round(parseFloat(studente_contabile.totale) * 100) / 100) + (Math.round(parseFloat(data.totale) * 100) / 100)
    let student_in_sospeso = student_totale 
        

    const corso_contabile = contabile.courses.find(course => course._id === corso_id)
    const costo =  parseFloat(Number(data.totale).toFixed(2))
        
         
    const cronologia = { utente_id:utente_id, utente_nome: studente.nome, course_id: corso_id, course_nome: corso.nome, costo: costo, prezzo_acquisto:corso_contabile.costo, rate:nrate, data: data.data, type:"ricev"}


    let stock = corso_contabile.stock - 1
    let vendite = corso_contabile.venduti + 1

    let corso_entrate = corso_contabile.totale_entrate + Math.round(parseFloat(data.totale) * 100) / 100
    
    let corso_uscite = vendite * corso_contabile.costo
   
    let profit = corso_entrate - corso_uscite

    await collection_contabile.updateOne(
        {},
        { $push: {"cronologia_transazioni": cronologia ,
                 "students.$[student].rate": data.rate },
          $set: { "students.$[student].totale": student_totale ,
                "students.$[student].in_sospeso": student_in_sospeso,
                "courses.$[course].stock":stock,
                "courses.$[course].venduti":vendite,
                "courses.$[course].totale_entrate":corso_entrate,
                "courses.$[course].totale_uscite":corso_uscite,
                "courses.$[course].totale_profit":profit  },
       
            },
          {arrayFilters: [
            { "student._id": utente_id },
            { "course._id": corso_id }
        ]} 

    );


    return res.json({ message: "ID corso aggiunto con successo", studente });
} catch (error) {
    console.error("Errore durante l'aggiunta dell'ID corso:", error);
    return res.status(500).json({ message: "Errore durante l'aggiunta dell'ID corso" });
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
app.post('x/update/:type/:id', async (req, res) => {
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

