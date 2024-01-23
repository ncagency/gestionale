

export const students = [
    {
            _id:38199209,
            info:{
                nome:"Luca", 
                secondo_nome:"Jr", 
                cognome:"Valori",
                dob:"25-05-2001", //data di nascita
                lob:"Benevento", //luogo di nascita
                prob:"BN", //provincia di nascita
                capb:82100, // cap luogo nascita
                state:"Italy", //stato di nascita
                cf:"LVHS01MSHWU12", //codice fiscale
                res:"Via Avellino 28", //indirizzo residenza
                cap_res:82100, //CAP RESIDENZA
                dom:"Via Avellino 28", //indirizzo domicilio
                cap_dom:82100, // CAP DOMICILIO
                prefix_cell:"+39",
                cellulare:"3662731403",
                email:"gerardo.dagostino12@gmail.com",

            },
            payments:{
                totale:3500,
                inviati:2000,
                da_dare:0,
            },
            courses_id:[
                77764555
            ],
            docs:{
                n_doc:"CA1177899", //numero documento fornito (CID, PATENTE, PASSAPORTO)
                l_doc:"COMUNE", //luogo rilascio documento fornito (COMUNE, MOTORIZZAZIONE)
                city_doc:"Benevento", //CITTA DI RILASCIO documento fornito
                rilascio_doc:"22-01-2023", //data rilascio
                scadenza_doc:"25-05-2033", //data scadenza
                immagini:{
                    path:"", //cartella studente
                    fronte:"",
                    retro:"",
                    vari_doc:[
                        {path:""}
                    ]
                }

        }
    }
] 


 //dipendente che utilizzerà la piattaforma
export const user = [
    {
        _id:33678947,
        username:"", //username accesso
        password:"", //password accesso
        info: //anagrafica dipendente
        {          
                nome:"Franco", 
                secondo_nome:"", 
                cognome:"D'Amore",
                dob:"21-02-1998", //data di nascita
                lob:"Benevento", //luogo di nascita
                prob:"BN", //provincia di nascita
                capb:82100, // cap luogo nascita
                state:"Italy", //stato di nascita
                cf:"FDVNSJSJIUEI", //codice fiscale
                res:"Via delle Puglie 12", //indirizzo residenza
                cap_res:82100, //CAP RESIDENZA
                dom:"Via delle Puglie 12", //indirizzo domicilio
                cap_dom:82100, // CAP DOMICILIO
                prefix_cell:"+39",
                cellulare:"3757425842",
                email:"gerardodagostinowork@outlook.it",

            },
        permessi:{

        }
    }
]


export const ente = [
    {}
]

export let corso = [
    {
        _id:77764555,
        nome:"EIPASS",
        ente:"FORMAZIONE ENTE",
        payments:{
            prezzo_acquisto:20,
            prezzo_vendita:140,
            entrate:0,
            uscite:0,
            profitto:0,
        },
        numero_utenti:0,
        id_utenti:[
            38199209
        ],
    },
    {
        _id:29388899,
        nome:"B1 INGLESE",
        ente:"FORMAZIONE ENTE",
        payments:{
            prezzo_acquisto:100,
            prezzo_vendita:180,
            entrate:0,
            uscite:0,
            profitto:0,
        },
        numero_utenti:0,
        id_utenti:[
            38199209
        ],
    }
    ]