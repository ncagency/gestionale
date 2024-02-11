'use client'

import React, { useState } from 'react';
import axios from 'axios';

function UploadForm({params}) {

  let id = params.id
  
  const [doc_type, setDocType] = useState("");
  const [n_doc, setNdoc] = useState("");
  const [l_doc, setLdoc] = useState("");
  const [city_doc, setCity] = useState("");
  const [emi, setEmi] = useState("");
  const [scad, setScad] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');



  const handleTypeChange = (event) => {
    setDocType(event.target.value)
  };

  const handleNumeroChange = (event) => {
    setNdoc(event.target.value)
  };

  const handleLdocChange = (event) => {
    setLdoc(event.target.value)
  };

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleEmiChange = (event) => {
    setEmi(event.target.value)
  }

  const handleScadChange = (event) => {
    setScad(event.target.value)
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
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
          <label htmlFor="doc_type">Numero Documento:</label>
          <input type="text" id="doc_type" value={doc_type} placeholder="CIE, PATENTE, PASSAPORTO" onChange={handleTypeChange} />
        </div>
        <div>
          <label htmlFor="n_doc">Numero Documento:</label>
          <input type="text" id="n_doc" value={n_doc} placeholder="N.Doc" onChange={handleNumeroChange} />
        </div>
        <div>
          <label htmlFor="l_doc">Luogo Rilascio:</label>
          <input type="text" id="l_doc" value={l_doc} placeholder="COMUNE,MOTORIZZAZIONE" onChange={handleLdocChange} />
        </div>
        <div>
          <label htmlFor="city_doc">Città Rilascio:</label>
          <input type="text" id="city_doc" value={city_doc} placeholder="Città" onChange={handleCityChange} />
        </div>
        <div>
          <label htmlFor="emi">Emissione</label>
          <input type="date" id="emi" value={emi} onChange={handleEmiChange} />
        </div>
        <div>
          <label htmlFor="scad">Scadenza:</label>
          <input type="date" id="scad" value={scad}  onChange={handleScadChange} />
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
