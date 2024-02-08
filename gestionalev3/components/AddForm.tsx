'use client'

import React,{useState,useEffect} from 'react'
import axios from 'axios'






export const AddEnti = () => {
  
  const [formData,setFormData] = useState({
    nome:'',
    indirizzo:'',
    citta:'',
    prov:'',
    stato:'',
    email:'',
    cellulare:'',
    altri_contatti:'',
    corsi:[]
  })
  
  const handleInputChange = (e) => {
    const {name , value} = e.target;
    console.log(e.target)
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:2000/add/ente', formData);
      console.log(response.data); // Fai qualcosa con la risposta se necessario
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
    }
  };

  return (
    <>
        <form className='d-flex flex-column align-items-center gap-2 '>
          <label>Nome</label>
          <input type='text' name="nome" value={formData.nome} onChange={handleInputChange}/>
          <label>Indirizzo</label>
          <input type='text' name="indirizzo" value={formData.indirizzo} onChange={handleInputChange}/>
          <label>Città</label>
          <div className='d-flex'>
            <input type='text' placeholder="Città" name="citta" value={formData.citta} onChange={handleInputChange} style={{width:'180px'}}/>
            <input type='text' placeholder="(Es. MI)" name="prov" value={formData.prov} onChange={handleInputChange} style={{width:'75px'}}/>
          </div>
          <label>Stato</label>
          <input type='text' name="stato" value={formData.stato} onChange={handleInputChange} />
          <label>Email</label>
          <input  type='email' name="email" value={formData.email} onChange={handleInputChange} />
          <label>Cellulare</label>
          <input type='text' placeholder="+Prefisso" name="cellulare" value={formData.cellulare} onChange={handleInputChange} />
          <label>Altri contatti</label>
          <textarea name="altri_contatti" value={formData.altri_contatti} onChange={handleInputChange} className='form-control'></textarea>
          <button onClick={handleSubmit} className='mt-2' >Invia</button>
        </form>
    </>
  )
}


const AddForm = () => {
  const divStyle = {
    width: '700px',
    padding: '60px',
  };

  
  return (
    <div  style={divStyle}  className='bg-primary rounded-4'> 
        <AddEnti />
    </div>
  )
}

export default AddForm