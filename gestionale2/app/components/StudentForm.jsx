
import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import "../globals.css";


const StudentForm = () => {

  const [formData, setFormData] =  useState({
    info: {
      nome: '',
      secondo_nome: '',
      cognome: '',
      dob: '',
      city: '',
      prov: '',
      state: '',
      sesso: '',
      cf: '',
      res_addr: '',
      res_city: '',
      res_prov: '',
      res_state: '',
      dom_addr: '',
      dom_city: '',
      dom_prov: '',
      dom_state: '',
      telefono: '',
      email: '',
    },
    corsi: [],
    payments: {
      totale: 0,
      saldati: 0,
      in_sospeso: 0,
      costo: 0,
      profitto: 0
    },
    docs: {
      identita: {
        n_doc: '',
        luogo_emi: '',
        citta: '',
        stato: '',
        paths: {
          fronte: '',
          retro: '',
        }
      },
      altro: {
        nome: '',
        path: ''
      }
    }
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
  
    if (field) {
      if (field.includes('[')) {
        const [fieldName, index] = field.split(/[\[\]]/).filter(Boolean);
        setFormData((prevData) => ({
          ...prevData,
          [section]: [
            ...prevData[section].map((item, i) =>
              i === parseInt(index, 10)
                ? {
                    ...item,
                    [fieldName]: value,
                  }
                : item
            ),
          ],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [section]: {
            ...prevData[section],
            [field]: value,
          },
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Effettua la chiamata POST utilizzando Axios
      const response = await axios.post(`http://127.0.0.1:2000/add/${type}`, formData);
  
      // Gestisci la risposta qui, ad esempio loggando la risposta
      console.log('Risposta API:', response.data);
  
      // Resetta il form o esegui altre azioni necessarie
    } catch (error) {
      // Gestisci gli errori qui, ad esempio loggando l'errore
      console.error('Errore API:', error);
    }
  };


  return (
    <div>
         <form onSubmit={handleSubmit} className='bg-red-300'>
                <div className='w-1/3 flex justify-center'>
                        <div className='flex flex-col items-center gap-0 p-4'>
                                    <label htmlFor="nome">Nome</label>
                                    <input type="text" id="nome" name="info.nome" value={formData.info.nome} onChange={handleChange} required />

                                    <label htmlFor="secondo_nome">Secondo Nome</label>
                                    <input type="text" id="secondo_nome" name="info.secondo_nome" value={formData.info.secondo_nome} onChange={handleChange} />

                                    <label htmlFor="cognome">Cognome</label>
                                    <input type="text" id="cognome" name="info.cognome" value={formData.info.cognome} onChange={handleChange} required /> 

                                    <label htmlFor="sesso">Sesso:</label>
                                    <input type="text" id="sesso" name="info.sesso" value={formData.info.sesso} onChange={handleChange} />

                                    <label htmlFor="telefono">Telefono:</label>
                                    <input type="text" id="telefono" name="info.telefono" value={formData.info.telefono} onChange={handleChange} />

                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="info.email" value={formData.info.email} onChange={handleChange} />

                                    <label htmlFor="dob">Data di Nascita:</label>
                                    <input placeholder='FORMATO (DD-MM-YYYY)' type="text" id="dob" name="info.dob" value={formData.info.dob} onChange={handleChange} />

                                    <label htmlFor="city">Città:</label>
                                    <input type="text" id="city" name="info.city" value={formData.info.city} onChange={handleChange} />

                                    <label htmlFor="prov">Provincia:</label>
                                    <input type="text" id="prov" name="info.prov" value={formData.info.prov} onChange={handleChange} />

                                    <label htmlFor="state">Stato:</label>
                                    <input type="text" id="state" name="info.state" value={formData.info.state} onChange={handleChange} />


                                    <label htmlFor="cf">Codice Fiscale:</label>
                                    <input type="text" id="cf" name="info.cf" value={formData.info.cf} onChange={handleChange} />
                        
                                    <label htmlFor="res_addr">Indirizzo di Residenza:</label>
                                    <input type="text" id="res_addr" name="info.res_addr" value={formData.info.res_addr} onChange={handleChange} />

                                    <label htmlFor="res_city">Città di Residenza:</label>
                                    <input type="text" id="res_city" name="info.res_city" value={formData.info.res_city} onChange={handleChange} />

                                    <label htmlFor="res_prov">Provincia di Residenza:</label>
                                    <input type="text" id="res_prov" name="info.res_prov" value={formData.info.res_prov} onChange={handleChange} />

                                    <label htmlFor="res_state">Stato di Residenza:</label>
                                    <input type="text" id="res_state" name="info.res_state" value={formData.info.res_state} onChange={handleChange} />
                                    <label htmlFor="dom_addr">Indirizzo Domicilio:</label>
                                    <input type="text" id="dom_addr" name="info.dom_addr" value={formData.info.dom_addr} onChange={handleChange} />

                                    <label htmlFor="dom_city">Città Domicilio:</label>
                                    <input type="text" id="dom_city" name="info.dom_city" value={formData.info.dom_city} onChange={handleChange} />

                                    <label htmlFor="dom_prov">Provincia Domicilio:</label>
                                    <input type="text" id="dom_prov" name="info.dom_prov" value={formData.info.dom_prov} onChange={handleChange} />

                                    <label htmlFor="dom_state">Stato Domicilio:</label>
                                    <input type="text" id="dom_state" name="info.dom_state" value={formData.info.dom_state} onChange={handleChange} />
                
                                    <label htmlFor="totale">Totale Pagamenti:</label>
                                    <input type="number" id="totale" name="payments.totale" value={formData.payments.totale} onChange={handleChange} />

                                    <label htmlFor="saldati">Pagamenti Saldati:</label>
                                    <input type="number" id="saldati" name="payments.saldati" value={formData.payments.saldati} onChange={handleChange} />

                                    <label htmlFor="in_sospeso">Pagamenti In Sospeso:</label>
                                    <input type="number" id="in_sospeso" name="payments.in_sospeso" value={formData.payments.in_sospeso} onChange={handleChange} />



                                    <label htmlFor="n_doc">Numero Documento:</label>
                                    <input type="text" id="n_doc" name="docs.identita.n_doc" value={formData.docs.identita.n_doc} onChange={handleChange} />

                                    <label htmlFor="luogo_emi">Luogo Emissione:</label>
                                    <input type="text" id="luogo_emi" name="docs.identita.luogo_emi" value={formData.docs.identita.luogo_emi} onChange={handleChange} />

                                    <label htmlFor="citta_doc">Città Documento:</label>
                                    <input type="text" id="citta_doc" name="docs.identita.citta" value={formData.docs.identita.citta} onChange={handleChange} />

                                    <label htmlFor="stato_doc">Stato Documento:</label>
                                    <input type="text" id="stato_doc" name="docs.identita.stato" value={formData.docs.identita.stato} onChange={handleChange} />
                                    <button type="submit">Aggiungi Studente</button>

                        </div>
                </div>
</form>
    </div>
    


  
  )
}

export default StudentForm