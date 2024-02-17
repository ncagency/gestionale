'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"

const style = {
  background: "linear-gradient(to right, #3b83ff, #2a59ac)",
  width: '700px', padding: '60px' 
}

const Iscrizione = () => {
  const todayDate: Date = new Date();
  const year: number = todayDate.getFullYear();
  const month: number = todayDate.getMonth() + 1; // i mesi sono indicizzati da 0 a 11
  const day: number = todayDate.getDate();

  const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const [courses, setCourses] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    costo: 0,
    stock:0,
    course_id: '',
    ente: '',
    data: formattedDate,
    type:"inv"
  });




  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const selectedCourse = courses.find((course) => course._id === formData.course_id);
      const updatedFormData = {
        ...formData,
        ente: selectedCourse ? selectedCourse.ente : '',
      };
  
      const response = await axios.put(`${apiURL}/stock/${selectedCourse._id}`, updatedFormData);
      console.log(response);
  
      // Esegui il redirect solo dopo che la richiesta PUT è stata completata con successo
      window.location.href = `/scheda/courses/${selectedCourse._id}`;
    } catch (error) {
      console.error('Errore durante la chiamata PUT:', error);
    }
  };
  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiURL}/courses/`);
        setCourses(response.data);
      } catch (error) {
        console.error('Errore durante il recupero dei corsi dal database', error);
      }
    };
    fetchCourses();
  }, []);

 

  return (
    <div className='d-flex'>
      <div style={style} className='bg-primary rounded-4' >
        <form className='d-flex flex-column align-items-end gap-2' onSubmit={handleSubmit}>
          <div className='d-flex'>
          <label>
            Corso:
            <select
              name="course_id"
              value={formData.course_id}
              onChange={handleInputChange}
              className="selector-width-state"
              required
            >
              <option value="" disabled>Seleziona Corso</option>
              <option value="">----</option>
              {courses.map((corso, index) => (
                <option key={index} value={corso._id}>
                  {corso.nome} 
                </option>
              ))}
            </select>
          </label>
          <label>
            Ente:
            <input
              type="text"
              value={
                courses
                  .find(course => course._id === formData.course_id)
                  ?.ente || ''
              }
              readOnly
              className="selector-width-state"
              required
            />
          </label>
            
            
          </div>
          <div className='d-flex gap-2'>
          <label>
            Costo:
            <input type="text" value={formData.costo} name="costo" onChange={handleInputChange} required />
          </label>
          <label>
            Stock:
            <input type="text" value={formData.stock} name="stock" onChange={handleInputChange} required />
          </label>
          </div>
         
          <button type="submit" className='mt-2'>Invia</button>
        </form>
      </div>
    </div>
  );
};






export default Iscrizione;