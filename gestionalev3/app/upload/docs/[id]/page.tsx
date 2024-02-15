'use client'

import React, { useState } from 'react';
import axios from 'axios';


const apiURL = "http://127.0.0.1:2000"

const style = {
  background: "linear-gradient(to right, #3b83ff, #2a59ac)",
}

function UploadForm({params}:{params:any}) {

  let id = params.id

  const [nome, setNome] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');



  const handleNome = (event:any) => {
    setNome(event.target.value)
  };

  const handleImageChange = (event:any) => {
    setImage(event.target.files[0]);
   
  };


 
  
  
  
  const handleSubmit = async (event:any) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('id', id);
    if (image) {
      formData.append('image', image, nome) // Aggiungi il campo 'file' con il nome del file
    }
    
  
    try {
      const response = await axios.post(`${apiURL}/upload_other`, formData, {
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
    const destinationValue = `/scheda/students/${id}`;
    window.location.href = destinationValue;
}

  return (
    <div className='p-5 w-50 rounded-4' style={style}>
      <h2 className='text-white mb-4'>Carica Altri Documenti</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4 d-flex flex-column'>
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" value={nome} placeholder="Nome" onChange={handleNome} />
        </div>

  
        <div className='mb-4 d-flex  flex-column'>
          <label htmlFor="image">Immagine</label>
          <input type="file" id="image" accept="image " onChange={handleImageChange} />
        </div>
     
        
        <button type="submit">Carica</button>
      </form>
    </div>
  );
}

export default UploadForm;
