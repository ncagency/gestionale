import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';

const ViewCorsi = (corsi_id: string[]) => {
    console.log(corsi_id)
    
  useEffect(() => {
    // Effettua una richiesta HTTP per ottenere i dati dalla collezione courses
    axios.get('http://127.0.0.1:2000/courses')
      .then(response => {
        // Imposta lo stato con i dati ottenuti dalla richiesta
        setCorsi(response.data);
      })
      .catch(error => {
        console.error('Errore durante il recupero dei dati:', error);
      });
  }, []);

  return (
    <div>
    <ul>
   
    </ul>
  </div>

  )
}

export default ViewCorsi