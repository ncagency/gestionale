'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from './Row';

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



  return (
    <div>
      <h1>Corsi</h1>
     
      <div className=' border border-2 m-2 rounded-4' style={{ height: '255px', overflowY: 'auto', padding: '20px' }}>
      <div className='d-flex flex-column gap-2 '>
       {corsi
            .filter(corso => corsi_id.includes(corso._id))
            .map((corso, index) => (
              <Row key={index} data={corso}  type="courses"/>
    
            ))}
      </div>
         </div>
   
      </div>
    
  );
}

export default ViewCorsi;
