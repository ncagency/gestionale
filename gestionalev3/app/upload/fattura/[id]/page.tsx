'use client'

import React, { useState } from 'react';
import axios from 'axios';



const apiURL = "http://127.0.0.1:2000"

const style = {
  background: "linear-gradient(to right, #3b83ff, #2a59ac)",
}

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
      const response = await axios.post(`${apiURL}/upload_fatture`, formData, {
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
    <div style={style} className='p-5 w-50 rounded-4'>
      <h2 className='text-white'>Carica Fattura</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className='d-flex gap-5 my-4'>
          
        <div>
          <label htmlFor="costo">Quantità:</label>
          <input type="text" id="costo" value={costo} placeholder="Quantità" onChange={handleCosto} />
        </div>

        <div>
          <label htmlFor="data">Data:</label>
          <input type="date" id="data" value={data} placeholder="Data" onChange={handleData} />
        </div>
          
          
        </div>
        
     
  
        <div className='my-4'>
          <label htmlFor="image">Immagine:</label>
          <input type="file" id="image" accept="image " onChange={handleImageChange} />
        </div>
     
        
        <button type="submit">Carica</button>
      </form>
    </div>
  );
}

export default UploadForm;
