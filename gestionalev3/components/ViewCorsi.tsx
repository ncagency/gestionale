'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewCorsi = ({ corsi_id, user_id }) => {
  const [corsi, setCorsi] = useState([]);
  const [corsoSelezionato, setCorsoSelezionato] = useState("");

  useEffect(() => {
    // Effettua una richiesta HTTP per ottenere i dati dalla collezione courses
    axios.get('http://127.0.0.1:2000/courses')
      .then(response => {
        // Imposta lo stato con tutti i corsi disponibili
        setCorsi(response.data);
      })
      .catch(error => {
        console.error('Errore durante il recupero dei dati:', error);
      });
  }, []);


  
  const handleAggiungiCorso = async () => {
    try {
      // Esegui la chiamata POST per aggiungere il corso all'utente
      await axios.post(`http://127.0.0.1:2000/aggiungicorsoutente/${user_id}/${corsoSelezionato}`);
      console.log("Corso aggiunto con successo all'utente.");
    } catch (error) {
      console.error('Errore durante l\'aggiunta del corso:', error);
    }
  };

  return (
    <div>
      <h1>Corsi</h1>
     
        <ul>
          {/* Mappa sui corsi dell'utente e visualizza i loro nomi */}
          {corsi
            .filter(corso => corsi_id.includes(corso._id))
            .map((corso, index) => (
              <li key={index}>{corso.nome}</li>
            ))}
        </ul>
      </div>
    
  );
}

export default ViewCorsi;
