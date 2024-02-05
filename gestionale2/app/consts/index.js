


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

{/* Corsi */}
<label htmlFor="corso_id">ID Corso:</label>
<input type="text" id="corso_id" name="corsi[0].corso_id" value={formData.corsi[0].corso_id} onChange={handleChange} />

<label htmlFor="data_iscrizione">Data Iscrizione:</label>
<input type="text" id="data_iscrizione" name="corsi[0].data_iscrizione" value={formData.corsi[0].data_iscrizione} onChange={handleChange} />

<label htmlFor="anno_accademico">Anno Accademico:</label>
<input type="text" id="anno_accademico" name="corsi[0].anno_accademico" value={formData.corsi[0].anno_accademico} onChange={handleChange} />

<label htmlFor="costo_tot">Costo Totale:</label>
<input type="text" id="costo_tot" name="corsi[0].costo_tot" value={formData.corsi[0].costo_tot} onChange={handleChange} />

<label htmlFor="rate">Rate:</label>
<input type="number" id="rate" name="corsi[0].rate" value={formData.corsi[0].rate} onChange={handleChange} />

<label htmlFor="scadenza_data">Data Scadenza:</label>
<input type="text" id="scadenza_data" name="corsi[0].scadenze[0].data" value={formData.corsi[0].scadenze[0].data} onChange={handleChange} />

<label htmlFor="saldato">Saldato:</label>
<input type="checkbox" id="saldato" name="corsi[0].scadenze[0].saldato" checked={formData.corsi[0].scadenze[0].saldato} onChange={handleChange} />
