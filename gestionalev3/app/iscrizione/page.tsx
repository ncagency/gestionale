'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Iscrizione = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    course_id: '',
    data: '',
    costo_transazione: 0,
    rate: [],
  });
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [enti, setEnti] = useState<any[]>([]);
  const [totale, setTotale] = useState<number>(0);
  const [numRate, setNumRate] = useState<number>(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRateChange = (index, field, value) => {
    const updatedRates = [...formData.rate];
    if (!updatedRates[index]) {
      updatedRates[index] = { valore: 0, data: '' };
    }
    updatedRates[index][field] = value;
    setFormData({
      ...formData,
      rate: updatedRates
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post('http://127.0.0.1:2000/', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
    }
  };

  const divStyle = {
    width: '700px',
    padding: '60px',
  };

  const handleCalcolaRate = () => {
    if (totale <= 0 || numRate <= 0) {
      alert('Inserire un totale e un numero di rate validi.');
      return;
    }

    const importoRata: number = totale / numRate;
    const today: Date = new Date();

    const newRateArray: any[] = Array.from({ length: numRate }, (_, index) => {
      const dataScadenza: Date = new Date(today.getFullYear(), today.getMonth() + index + 1, today.getDate());
      return {
        valore: importoRata.toFixed(2),
        data: dataScadenza.toISOString().slice(0, 10),
        pagata:false
      };
    });

    setFormData({
      ...formData,
      rate: newRateArray
    });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:2000/students/`);
        const studenti = response.data;
        setStudents(studenti);

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
            Studente:
            <select
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange}
              className="selector-width-state "
              required
            >
              <option value="" disabled>Seleziona Studente</option>
              {students.map((student, index) => (
                <option key={index} value={student._id}>
                  {student.nome} {student.secondo_nome} {student.cognome}
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
              className="selector-width-state "
              required
            >
              <option value="" disabled>Seleziona Corso</option>
              {courses.map((corso, index) => (
                <option key={index} value={corso._id}>
                  {corso.nome}
                </option>
              ))}
            </select>
          </label>

          <label>
            Totale:
            <input type="number" value={totale} onChange={(e) => setTotale(parseFloat(e.target.value))} required />
          </label>

          <label>
            Numero di Rate:
            <input type="number" value={numRate} onChange={(e) => setNumRate(parseInt(e.target.value))} required />
          </label>

          <button type="button" onClick={handleCalcolaRate}>Calcola Rate</button>

          {formData.rate.length > 0 && formData.rate.map((rate, index) => (
            <div key={index}>
              <label>
                Valore Rata {index + 1}:
                <input
                  type="number"
                  value={rate.valore}
                  onChange={(e) => handleRateChange(index, 'valore', parseFloat(e.target.value))}
                />
              </label>
              <label>
                Data Scadenza Rata {index + 1}:
                <input
                  type="date"
                  value={rate.data}
                  onChange={(e) => handleRateChange(index, 'data', e.target.value)}
                />
              </label>
            </div>
          ))}

          <button type="submit" className='mt-2'>Invia</button>
        </form>
      </div>
    </div>
  );
};



export default Iscrizione;