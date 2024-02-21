'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"


const Iscrizione = () => {
  const todayDate: Date = new Date();
  const year: number = todayDate.getFullYear();
  const month: number = todayDate.getMonth() + 1; // i mesi sono indicizzati da 0 a 11
  const day: number = todayDate.getDate();
  const[coursetype, setCourse] = useState("") 
const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

const [formData, setFormData] = useState<{
  user_id: string;
  course_id: string;
  course_name:string;
  data: string;
  flag: boolean;
  totale: number;
  prezzo_acquisto:number;
  percentuale:number;
  accademico:any;
  rate: any; 
}>({
  user_id: '',
  course_id: '',
  course_name: '',
  flag:false,
  data: formattedDate,
  totale: 0,
  prezzo_acquisto:0,
  percentuale:0,
  accademico:"",
  rate: [],
});

  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [enti, setEnti] = useState<any[]>([]);
  const [totale, setTotale] = useState<number>(0);
  const [numRate, setNumRate] = useState<number>(0);


  const handleCourseChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    const selectedCourse = courses.find(course => course._id === value);
    setCourse(selectedCourse.tipo);

  }
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'totale') {
      setTotale(parseFloat(value));}
    }


  const handleRateChange = (index: number, field: any, value: any) => {
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

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/iscrizione/`, formData);
      redirec(response.data.studente._id)
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
    }
  };

  const divStyle = {
    width: '700px',
    padding: '60px',
    background: "linear-gradient(to right, #3b83ff, #2a59ac)",

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
        pagata:false,
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
        const response = await axios.get(`${apiURL}/students/`);
        const studenti = response.data;
        setStudents(studenti);

        const response2 = await axios.get(`${apiURL}/courses/`);
        const corsi = response2.data;
        setCourses(corsi);
      } catch (error) {
        console.error('Errore durante il recupero dal database', error);
      }
    };
    fetch();
  }, []);

  const redirec = (id:any) => {
    const destinationValue = `/scheda/students/${id}`;
    window.location.href = destinationValue;
}

  return (
    <div className='d-flex '>
      <div style={divStyle} className='bg-primary rounded-4'>
        <form className='d-flex flex-column align-items-start gap-2 ' onSubmit={handleSubmit}>
          
          <div className='d-flex gap-2'>
            <div className='d-flex flex-column '>
            <label>
              Studente:
              </label>
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
            </div>
          

            <div className='d-flex gap-2'>
            <div className='d-flex flex-column '>
            <label>
            Corso:
            </label>
            <select
              name="course_id"
              value={formData.course_id}
              onChange={handleCourseChange}
              className="selector-width-state "
              required
            >
              <option value="" disabled>Seleziona Corso</option>
              {courses.map((corso, index) => (
                <option key={index} value={corso._id}>
                  {corso.nome} | {corso.tipo}
                </option>
              ))}

            </select>
              </div>
              </div>
          
       
            
            
            </div>

          <div className='d-flex flex-column gap-2'>
            <div className='d-flex gap-5'>
                <div className='d-flex flex-column'>
                <label>Prezzo Vendita:</label>
                  <input className="input_small" type="number" value={formData.totale} name="totale"  onChange={(e) => handleInputChange(e)}  required />
        
                  </div>
                  {coursetype == "Uni" && (<div  className='d-flex flex-column'>
                  <label className='fs-5'> Percentuale </label>
                  <div className='d-flex gap-2'>
                  <input className="input_small" placeholder="Utilizza solo con Corsi universitari" type="number" value={formData.percentuale} name="percentuale"  onChange={(e) => handleInputChange(e)}  required />
                  <p className='subtitle'>(Solo con Corsi universitari, senza simbolo %)</p>
                  </div>
                  </div>)}
                {coursetype == "standard" && (<div  className='d-flex flex-column'>
                  <label className='fs-5'> Prezzo di Acquisto </label>
                  <div className='d-flex gap-2'>
                  <input className="input_small" placeholder="Prezzo di Acquisto" type="number" value={formData.prezzo_acquisto} name="prezzo_acquisto"  onChange={(e) => handleInputChange(e)}  required />
                  <p className='subtitle'>(Utilizza solo con corsi su Fattura)</p>
                  </div>
                </div>)}
            
            </div>
            <div className='d-flex gap-3'>
              <div className='d-flex flex-column'><label className=''>   Numero Rate:   </label>
              <input className="input_small" type="number" value={numRate} onChange={(e) => setNumRate(parseInt(e.target.value))} required />
              </div>
              <div className='d-flex flex-column'>
              <label className=''>Anno Accademico:  </label>
              <input placeholder="Solo con Corsi universitari"  name="accademico"  type="text" value={formData.accademico}  onChange={(e) => handleInputChange(e)}  required />
              </div>
            </div>
         

          </div>
          


          {formData.rate.length > 0 && formData.rate.map((rate:any, index:any) => (
            <div className="d-flex" key={index}>
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
          <div className='d-flex gap-5'>
          <button type="button" onClick={handleCalcolaRate}>Calcola Rate</button>
          <button type="submit" className='mt-2'>Invia</button>
            </div>

        </form>
      </div>
    </div>
  );
};



export default Iscrizione;
