'use client'

import React, { useState } from 'react';
import axios from 'axios';

function UploadForm({params}) {

  let id = params.id
  console.log(id)

  const [codice, setCodice] = useState(id);
  const [path, setPath] = useState(`${id}`);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleCodiceChange = (event) => {
    return 0
  };

  
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('codice', codice);
    formData.append('path', path);
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:2000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Errore durante il caricamento dell\'immagine.');
    }
  };

  return (
    <div>
      <h2>Carica un'immagine</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codice">Codice:</label>
          <input type="text" id="codice" value={codice} onChange={handleCodiceChange} />
        </div>
        <div>
          <label htmlFor="image">Immagine:</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Carica</button>
      </form>
    </div>
  );
}

export default UploadForm;
