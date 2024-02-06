'use client'
import  { useState, ChangeEvent, FormEvent,useEffect, FC } from "react";
import axios from "axios";
import Link from "next/link";
import { province,paesiOrdinati } from "../manager/[type]/page";


function redirectToHome(query:string) {
    location.href = `http://127.0.0.1:3000/${query}`;
  }


const EnteAdd  = () => {



    let type = "enti"
    const [formData, setFormData] = useState({
            nome:"",
            indirizzo:" ",
            citta:"",
            prov:"",
            stato:"",
            email:"",
            cellulare:"",
            altri_contatti:[
            ],
            payments:{
                da_saldare:0,
                saldati:0,
                totale_dati:0,
                
            },
            fatture:[
                ""
            ],
            corsi_id:[""
            ]
        });

        
    const handleInputChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      const keys = name.split('.');
      const inputCategory = keys[0];
      const inputField = keys[keys.length - 1];
  
      setFormData((prevFormData) => {
        if (keys.length === 1) {
          // If no nesting, directly update the value
          return { ...prevFormData, [inputCategory]: value };
        } else if (keys.length === 2) {
          // If one level of nesting, update the nested object value
          return {
            ...prevFormData,
            [inputCategory]: { ...prevFormData[inputCategory], [inputField]: value },
          };
        } else {
          // If more than one level of nesting, update the deeply nested object value
          const updatedCategory = keys.reduce(
            (acc, key, index) =>
              index === keys.length - 1
                ? { ...acc, [key]: value }
                : { ...acc[key] },
            { ...prevFormData }
          );
          return { ...prevFormData, [inputCategory]: updatedCategory };
        }
      });
    };
  
    


    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      
      try {
        // Effettua la chiamata POST utilizzando Axios
        const response = await axios.post(`http://127.0.0.1:2000/add/${type}`, formData);
        
        // Gestisci la risposta qui, ad esempio loggando la risposta
        console.log('Risposta API:', response.data);
        let id = response.data.data._id
        var query = `/scheda/${type}/${id}`
        redirectToHome(query)

        // Resetta il form o esegui altre azioni necessarie
      } catch (error) {
        // Gestisci gli errori qui, ad esempio loggando l'errore
        console.error('Errore API:', error);
      }
    };
  
    return   (
          <>
          <form  onSubmit={handleSubmit} className="d-flex flex-column gap-5 p-3">
                  <label>Aggiungi Ente</label>
                  <button type="submit">Invia Dati</button>
  
  
                  <label>Info</label>
  
                <div className="d-flex gap-3 form">
                    <h3>Nome</h3>
                    <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    />
                    <h3 className="">Indirizzo</h3>
                    <input 
                      type="text"
                      name="indirizzo"
                      value={formData.indirizzo}
                      onChange={handleInputChange}
                    />
                    <h3 className="">Città</h3>
                    <input 
                   type="text"
                   name="citta"
                   value={formData.citta}
                   onChange={handleInputChange}
                    />
                </div>
                    <select 
                    name="prov"
                    value={formData.prov}
                    onChange={handleInputChange} 
                    className="selector-width">
                        <option value="" disabled>Seleziona una provincia</option>
                        {province.map((province, index) => (
                          <option key={index} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                      
                      <h3>Stato</h3>
                      <select 
                      name="stato"
                      value={formData.stato}
                      onChange={handleInputChange} 
                      className="selector-width-state ">
                        <option value="" disabled>Seleziona uno Stato</option>
                        {paesiOrdinati.map((paese, index) => (
                          <option key={index} value={paese}>
                            {paese}
                          </option>
                        ))}
                      </select>

                <div className="d-flex gap-3 form">
                    <h3 className="">Email</h3>
                      <input 
                         type="email"
                         name="email"
                         value={formData.email}
                         onChange={handleInputChange}/>
                      <h3 className="">Cellulare</h3>
                 
                      <input 
                       type="text"
                       name="cellulare"
                       value={formData.cellulare}
                       onChange={handleInputChange}
                       />
                       //altri contatti aggiungi in sequenza
                </div>
                    
            
                
  
                <div className="d-flex gap-5 form">
                          
                          <div className="d-flex flex-column gap-2">
                            <h3 className="">da Saldare</h3>
                            <input 
                             type="text"
                             name="payments.da_saldare"
                             value={formData.payments.da_saldare}
                             onChange={handleInputChange}
                            />
                            <h3 className="">Saldati</h3>
                            <input    
                            type="text"
                             name="payments.saldati"
                             value={formData.payments.saldati}
                             onChange={handleInputChange}
                             />
                            <div className="d-flex gap-3">
                              <div>
                                <h3 className="">Totale</h3>
                                <input 
                                type="text"
                                name="payments.totale_dati"
                                value={formData.payments.totale_dati}
                                onChange={handleInputChange}
                                className="selector-width"/>
                              </div>
                             
                             
                            </div>
                            
                          </div>
  
                   
                      
  
                </div>
  
                
  
  
              </form>
              <style jsx>{`
          
          .form h3{
            font-size:15px
          }
          .form p{
            font-size:10px;
          }
          .form input {
            height: 30px;
            border: 2px;
          }
          .selector-width {
            width: 70px; 
            height: 30px;
          }
  
          .selector-width-state {
            width: 140px; 
            height: 30px;
          }
        `}</style>
          </>
    )
  }
  
export default EnteAdd;