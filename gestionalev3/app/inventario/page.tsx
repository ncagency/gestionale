'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Iscrizione = () => {
  const todayDate: Date = new Date();
  const year: number = todayDate.getFullYear();
  const month: number = todayDate.getMonth() + 1; // i mesi sono indicizzati da 0 a 11
  const day: number = todayDate.getDate();

const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const [formData, setFormData] = useState({
    costo: '',
    stock: '',
  });


  const [costo, setCosto] = useState(null);
  const [stock, setStock] = useState(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [enti, setEnte] = useState("");
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
   
  };

  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post('http://127.0.0.1:2000/stock/', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
    }
  };

  const divStyle = {
    width: '700px',
    padding: '60px',
  };

  useEffect(() => {
    const fetch = async () => {
      try {
      
        const response2 = await axios.get(`http://127.0.0.1:2000/courses/`);
        const corsi = response2.data;
        setCourses(corsi);
      } catch (error) {
        console.error('Errore durante il recupero dal database', error);
      }
    };
    fetch();
  }, []);

  return (
    <div className='d-flex '>
      <div style={divStyle} className='bg-primary rounded-4'>
        <form className='d-flex flex-column align-items-center gap-2 ' onSubmit={handleSubmit}>
    
          <label>
            Corso:
            <select
              name="course_id"
              value={formData.course_id}
              onChange={handleInputChange}
              className="selector-width-state "
              required
            >
              <option value="" disabled>Seleziona Corso</option>
              {courses.map((corso, index) => (
                <option key={index} value={corso._id}>
                  {corso.nome} - {corso.ente}
                </option>
              ))}
            </select>
          </label>
          

          <label>
            Costo:
            <input type="text" value={costo} name="costo"  onChange={(e) => handleInputChange(e)}  required />
          </label>

        

          <button type="submit" className='mt-2'>Invia</button>
        </form>
      </div>
    </div>
  );
};



export default Iscrizione;
