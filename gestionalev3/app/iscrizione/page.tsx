'use client'

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { ObjectId } from 'mongodb'



//    rata  {costo:0, scadenza:'', pagata:false}

const Iscrizione = () => {
  
  const [formData,setFormData] = useState({
    user_id:'',
    course_id:'',
    data:'',
    costo_transazione:0,
    rate:[
    ],
  })
  const [students, setStudents] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [enti, setEnti] = useState<any[]>([])

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
      const response = await axios.post('http://127.0.0.1:2000/add/student', formData);
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
        const response = await axios.get(`http://127.0.0.1:2000/students/`);
        const studenti = response.data;
        setStudents(studenti);

        const response2 = await axios.get(`http://127.0.0.1:2000/courses/`);
        const corsi = response2.data
        setCourses(corsi)
  
  
      } catch (error) {
        console.error('Errore durante il recupero dal database', error);
      }
    }
    fetch()
  })
  
  


  return (
    <div className='d-flex '>
    <div  style={divStyle}  className='bg-primary rounded-4'> 
        <form className='d-flex flex-column align-items-center gap-2 '>

          <label>
                  Studente:
                    <select 
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleInputChange} 
                        className="selector-width-state ">
                          <option value="" disabled>Seleziona Studente</option>
                          {students.map((student, index) => (
                            <option key={index} value={student._id}>
                              {student.nome}  {student.secondo_nome}  {student.cognome}
                            </option>
                          ))}
                        </select>
            </label>

            <label>
                  Corso:
                    <select 
                        name="course_id"
                        value={formData.course_id}
                        onChange={handleInputChange} 
                        className="selector-width-state ">
                          <option value="" disabled>Seleziona Corso</option>
                          {courses.map((corso, index) => (
                            <option key={index} value={corso._id}>
                              {corso.nome}
                            </option>
                          ))}
                        </select>
            </label>
              
              

          <button onClick={handleSubmit} className='mt-2' >Invia</button>

        </form>
        </div>
        </div>
  )
}



export default Iscrizione