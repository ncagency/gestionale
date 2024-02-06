'use client'
import  { useState, ChangeEvent, FormEvent, FC } from "react";
import axios from "axios";
import Link from "next/link";
import { province,paesiOrdinati } from "../manager/[type]/page";


function redirectToHome(query:string) {
    location.href = `http://127.0.0.1:3000/${query}`;
  }


const CourseAdd  = () => {



    let type = "courses"
    const [formData, setFormData] = useState({
            nome:"",
            ente:" ",
            n_iscritti:0,
            utenti:[],
            payments:{
              entrate:0,
              uscite:0,
              profitto:0,
              costo_singolo:0,
              stock:0
            }
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
                    <h3 className="">Ente</h3>
                    <input 
                      type="text"
                      name="ente"
                      value={formData.ente}
                      onChange={handleInputChange}
                    />
                    <h3 className="">Entrate</h3>
                    <input 
                      type="text"
                      name="payments.entrate"
                      value={formData.payments.entrate}
                      onChange={handleInputChange}
                    />
                    <h3 className="">Uscite</h3>
                    <input 
                      type="text"
                      name="payments.uscite"
                      value={formData.payments.uscite}
                      onChange={handleInputChange}
                    />
                    <h3 className="">Costo Singolo</h3>
                    <input 
                      type="text"
                      name="payments.costo_singolo"
                      value={formData.payments.costo_singolo}
                      onChange={handleInputChange}
                    />
                    <h3 className="">Stock</h3>
                    <input 
                      type="text"
                      name="payments.stock"
                      value={formData.payments.stock}
                      onChange={handleInputChange}
                    />
                 
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
  
export default CourseAdd;