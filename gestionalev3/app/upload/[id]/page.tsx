'use client'

import React, { useState } from 'react';
import axios from 'axios';

const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"


const style = {
  background: "linear-gradient(to right, #3b83ff, #2a59ac)",
}


function UploadForm({params}:{params:any}) {

  
  let id = params.id
  const redirec = () => {
    const destinationValue = `/scheda/students/${id}`;
    window.location.href = destinationValue;
}

  const [doc_type, setDocType] = useState("");
  const [n_doc, setNdoc] = useState("");
  const [l_doc, setLdoc] = useState("");
  const [city_doc, setCity] = useState("");
  const [state_doc, setState] = useState("");
  const [emi, setEmi] = useState("");
  const [scad, setScad] = useState("");
  const [image_front, setImageFront] = useState(null);
  const [image_retro, setImageRetro] = useState(null);
  const [message, setMessage] = useState('');



  const handleTypeChange = (event:any) => {
    setDocType(event.target.value)
  };

  const handleNumeroChange =  (event:any) => {
    setNdoc(event.target.value)
  };

  const handleLdocChange =  (event:any) => {
    setLdoc(event.target.value)
  };

  const handleCityChange =  (event:any) => {
    setCity(event.target.value)
  }

  const handleStateChange =  (event:any) => {
    setState(event.target.value)
  }

  const handleEmiChange = (event:any) => {
    setEmi(event.target.value)
  }

  const handleScadChange = (event:any) => {
    setScad(event.target.value)
  }

  const handleImageChange = (event:any) => {
    setImageFront(event.target.files[0]);
  
  };


  const handleImageChange2 = (event:any) => {
    setImageRetro(event.target.files[0]);
  
  };
  
  
  
  const handleSubmit = async  (event:any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
     formData.append('doc_type', doc_type);
    formData.append('n_doc', n_doc);
    formData.append('l_doc', l_doc);
    formData.append('city_doc', city_doc);
    formData.append('state_doc', state_doc);
    formData.append('emi', emi);
    formData.append('scad', scad);
    if (image_front) {
      formData.append('image_front', image_front);
    }
    if (image_retro) {
      formData.append('image_retro', image_retro);
    }
    
    try {
      const response = await axios.post(`${apiURL}/upload`, formData, {
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

  return (
    <div style={style}  className='container p-4 rounded-3'>
      <h2 className='text-white mb-4'>Carica un'immagine</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        
        <div className='d-flex w-100 gap-4'>
          
                <div className='d-flex flex-column'>
                  <label htmlFor="doc_type">Tipo Documento</label>
                  <input type="text" id="doc_type" value={doc_type} placeholder="CIE, PATENTE, PASSAPORTO" onChange={handleTypeChange} />
                </div>
                <div className='d-flex flex-column'>
                <label htmlFor="n_doc">Numero Documento</label>
                <input type="text" id="n_doc" value={n_doc} placeholder="N.Doc" onChange={handleNumeroChange} />
                </div>
        </div>
        <div className='d-flex w-100 gap-4 mt-2'>
        
        <div className='d-flex flex-column'>
                <label htmlFor="l_doc">Luogo Rilascio</label>
                 <input type="text" id="l_doc" value={l_doc} placeholder="COMUNE,MOTORIZZAZIONE" onChange={handleLdocChange} />
                </div>
                <div className='d-flex flex-column'>
                <label htmlFor="city_doc">Città Rilascio</label>
                <input type="text" id="city_doc" value={city_doc} placeholder="Città" onChange={handleCityChange} />
                </div>


                <div className='d-flex flex-column'>
                <label htmlFor="state_doc">Stato:</label>
                <input type="text" id="state_doc" value={state_doc} placeholder="Stato" onChange={handleStateChange} />
                </div>
        </div>
                
        <div className='d-flex gap-5 my-4'>
            <div  className='d-flex flex-column'>
            <label htmlFor="emi">Emissione</label>
              <input type="date" id="emi" value={emi} onChange={handleEmiChange} />
            </div>
            <div className='d-flex flex-column'>
              <label htmlFor="scad">Scadenza</label>
              <input type="date" id="scad" value={scad}  onChange={handleScadChange} />
            </div>

        <div className='d-flex flex-column'>
        <div  className='d-flex flex-column'>
          <label htmlFor="image_front">Fronte</label>
          <input type="file" id="image_front" accept="image_front/*" onChange={handleImageChange} />
        </div>
          <div  className='d-flex flex-column'>
          <label htmlFor="image_retro">Retro</label>
          <input type="file" id="image_retro" accept="image_retro/*" onChange={handleImageChange2} />
        </div>

        </div>
           



        </div>
       
      
       
       
        
      
        
        <button type="submit">Carica</button>
      </form>
    </div>
  );
}

export default UploadForm;
