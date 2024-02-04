


//STRUTTURA DATI UTENTE BASE



const student = {
    _id:{predefinitomongo:''},
    info:{
        nome:'',
        secondo_nome:'',
        cognome:'',
        dob:'', // DD-MM-YYYY formato così
        city:'',
        prov:'',
        state:'',
        sesso:'',
        cf:'',
        res_addr:'', 
        res_city:'',
        res_prov:'',
        res_state:'',
        dom_addr:'', 
        dom_city:'',
        dom_prov:'',
        dom_state:'',
        telefono:'',
        email:'',
    },
    corsi:[
        {
            corso_id:'prendi da mongo',
            data_iscrizione:'',
            anno_accademico:'',
            costo_tot:'',
            rate:0, // impostare numero rate
            scadenze:[ // 1 slot per OGNI RATA IMPOSTATA, visualizzare tutte le scadenze e impostare se è saldata o no e scalare dinamicamente
                {data:'DD-MM-YYYY', saldato:true},{data:'DD-MM-YYYY', saldato:true},{data:'DD-MM-YYYY', saldato:false}
            ]
        }
    ],
    payments:{
        totale:0,
        saldati:0,
        in_sospeso:0,
        costo:0,
        profitto:0
    },
    docs:{
        identita:{
            n_doc:'',
            luogo_emi:'',
            citta:'',
            stato:'',
            paths:{
                fronte:'',
                retro:'',
            }
        },
        altro:{
            nome:'path' //mostrarli in lista, vari documenti caricati
        }
    }
}
