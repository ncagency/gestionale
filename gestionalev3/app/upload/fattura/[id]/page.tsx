'use client'

import React, { useState } from 'react';
import axios from 'axios';

function UploadForm({params}:{params:any}) {

  let id = params.id

  const [costo, setCosto] = useState("");
  const [data, setData] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');



  const handleCosto = (event:any) => {
    setCosto(event.target.value)
  };

  const handleData = (event:any) => {
    setData(event.target.value)
  };

  const handleImageChange = (event:any) => {
    setImage(event.target.files[0]);
  
  };


 
  
  
  
  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('costo', costo);
    if (image) {
      formData.append('image', image, data) 
    }

    try {
      const response = await axios.post('http://51.210.108.56:2000/upload_fatture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
      redirec()
    } catch (error) {
      setMessage('Errore durante il caricamento dell\'immagine.');
    }
  };
    
  const redirec = () => {
    const destinationValue = `/scheda/enti/${id}`;
    window.location.href = destinationValue;
}

  return (
    <div className='p-5'>
      <h2>Carica Fattura</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="costo">Quantità:</label>
          <input type="text" id="costo" value={costo} placeholder="Quantità" onChange={handleCosto} />
        </div>

        <div>
          <label htmlFor="data">Data:</label>
          <input type="date" id="data" value={data} placeholder="Data" onChange={handleData} />
        </div>
  
        <div>
          <label htmlFor="image">Immagine:</label>
          <input type="file" id="image" accept="image " onChange={handleImageChange} />
        </div>
     
        
        <button type="submit">Carica</button>
      </form>
    </div>
  );
}

export default UploadForm;
