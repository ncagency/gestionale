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
      
      <div>
        <h2>Aggiungi corso</h2>
        <select value={corsoSelezionato} onChange={(e) => setCorsoSelezionato(e.target.value)}>
          <option value="">Seleziona un corso</option>
          {/* Mappa sui corsi e visualizza le opzioni */}
          {corsi.map((corso, index) => (
            <option key={index} value={corso._id}>{corso.nome}</option>
          ))}
        </select>
        <button onClick={handleAggiungiCorso}>+</button>
      </div>
      <hr />
      <div>
        <ul>
          {/* Mappa sui corsi dell'utente e visualizza i loro nomi */}
          {corsi
            .filter(corso => corsi_id.includes(corso._id))
            .map((corso, index) => (
              <li key={index}>{corso.nome}</li>
            ))}
        </ul>
      </div>
    
    </div>
  );
}

export default ViewCorsi;
