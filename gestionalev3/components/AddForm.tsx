'use client'

import React,{useState,useEffect} from 'react'







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

  return (
    <>
        <form className='d-flex flex-column align-items-center gap-2'>
          <label>Nome</label>
          <input type='text' name="nome" value={formData.nome} onChange={handleInputChange}/>
          <label>Indirizzo</label>
          <input type='text' name="indirizzo" value={formData.indirizzo} onChange={handleInputChange}/>
          <label>Città</label>
          <div className='d-flex'>
            <input type='text' placeholder="Città" name="citta" value={formData.citta} onChange={handleInputChange}/>
            <input type='text' placeholder="(Es. MI)" name="prov" value={formData.prov} onChange={handleInputChange} style={{width:'75px'}}/>
          </div>
          <label>Stato</label>
          <input type='text' name="stato" value={formData.stato} onChange={handleInputChange} />
          <label>Email</label>
          <input  type='email' name="email" value={formData.email} onChange={handleInputChange} />
          <label>Cesllulare</label>
          <input type='text' placeholder="+Prefisso" name="cellulare" value={formData.cellulare} onChange={handleInputChange} />
          <label>Altri contatti</label>
          <textarea type="note" name="altri_contatti" value={formData.altri_contatti} onChange={handleInputChange} className='form-control'></textarea>
        </form>
    </>
  )
}


const AddForm = () => {
  const divStyle = {
    width: '700px',
    padding: '80px'
  };

  
  return (
    <div  style={divStyle}  className='bg-primary'> 
        <AddEnti />
    </div>
  )
}

export default AddForm