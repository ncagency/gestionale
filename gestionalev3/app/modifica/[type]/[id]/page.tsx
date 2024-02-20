'use client'

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { ObjectId } from 'mongodb'


const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"


const EditCourses = ({id}:{id:any}) => {
  
  const [formData,setFormData] = useState({
    nome:'',
    ente:'',
    utenti:[]
  })

  
  const handleInputChange = (e:any) => {
    const {name , value} = e.target;
    console.log(e.target)
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/modifica/courses/${id}`, formData);
      console.log(response.data); 
      redirec()
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
    }
  };


  const [entiData, setEntiData] = useState([]);
   
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/enti/`);
        let array:any = []
        response.data.map((dato:any) => {
            array.push(dato.nome)
        })
        setEntiData(array);
        
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };


    fetchData();
    fetchData2()
    // Clean-up function to cancel any ongoing requests if the component unmounts
    return () => {
      // Cleanup logic, e.g., cancel any ongoing requests
    };
  }, []); // Empty dependency array to ensure the effect runs only once after initial render

  const fetchData2 = async () => {
    try {
      const response = await axios.get(`${apiURL}/courses/${id}`);
      const courseData = response.data;
      setFormData(courseData);
    } catch (error) {
      console.error('Errore durante il recupero dei dati del corso:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const redirec = () => {
    const destinationValue = `/scheda/courses/${id}`;
    window.location.href = destinationValue;
}
  return (
    <>
        <form className='d-flex flex-column align-items-center gap-2' onSubmit={handleSubmit}>
          <label>Nome</label>
          <input type='text' name="nome" value={formData.nome} onChange={handleInputChange}/>
          <label>Ente</label>
          <select 
                      name="ente"
                      value={formData.ente}
                      onChange={handleInputChange} 
                      className="selector-width-state ">
                        <option value="" disabled>Seleziona Ente</option>
                        {entiData.map((ente, index) => (
                          <option key={index} value={ente}>
                            {ente}
                          </option>
                        ))}
                      </select>
          
          <button type="submit" className='mt-2' >Invia</button>
        </form>
    </>
  )
}

const EditEnti = ({id}:{id:any}) => {
  
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

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/enti/${id}`);
      const entiData = response.data;
      setFormData(entiData);
    } catch (error) {
      console.error('Errore durante il recupero dei dati dello studente:', error);
    }
  };

  const handleInputChange = (e:any) => {
    const {name , value} = e.target;
    console.log(e.target)
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(`${apiURL}/modifica/enti/${id}`, formData);
      console.log(response.data); 
      redirec()
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
    }
  };
  const redirec = () => {
      const destinationValue = `/scheda/courses/${id}`;
      window.location.href = destinationValue;
  }
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

const EditStudents = ({id}:{id:any}) => {
  const [formData, setFormData] = useState({
    nome:'',
    secondo_nome:'',
    cognome:'',
    sesso:'',
    dob:'',
    lob:'',
    prov_b:'',
    state_b:'',
    cf:'',
    indirizzo_res:'',
    citta_res:'',
    prov_res:'',
    stato_res:'',
    indirizzo_dom:'',
    citta_dom:'',
    prov_dom:'',
    stato_dom:'',
    cellulare:'',
    email:'',
    corsi:[],
    docs:{
      n_doc:'',
      l_doc:'',
      city_doc:'',
      state_doc:'',
      emissione:'',
      scadenza:'',
    }
  });

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/students/${id}`);
      const studentData = response.data;
      setFormData(studentData);
    } catch (error) {
      console.error('Errore durante il recupero dei dati dello studente:', error);
    }
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiURL}/modifica/students/${id}`, formData);
      console.log(response)
      window.location.href =  `/scheda/students/${id}`;
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
    }
  };


  return (
    <>
        <form className='d-flex flex-column align-items-center gap-2 ' onSubmit={handleSubmit}>
          <div className='d-flex gap-2'>
            <input type='text' placeholder="Nome" name="nome" value={formData.nome} onChange={handleInputChange} style={{width:'150px'}}/>
            <input type='text' placeholder="Secondo Nome" name="secondo_nome" value={formData.secondo_nome} onChange={handleInputChange} style={{width:'150px'}}/>
            <input type='text' placeholder="Cognome" name="cognome" value={formData.cognome} onChange={handleInputChange} style={{width:'150px'}}/>
            <input type='text' placeholder="Sesso:(M o F)" name="sesso" value={formData.sesso} onChange={handleInputChange} style={{width:'150px'}}/>
          </div>
          <div className='d-flex gap-2'>
              <div className='flex-column d-flex gap-1'>
                  <label>Data di Nascita</label>
                  <input type='date' placeholder="Data di Nascita" name="dob" value={formData.dob} onChange={handleInputChange} style={{width:'150px'}}/>
              </div>
              <div className='flex-column d-flex gap-1'>
                  <label><br/></label>
                  <input type='text' placeholder="Città di Nascita" name="lob" value={formData.lob} onChange={handleInputChange} style={{width:'150px'}}/>
              </div>
              <div className='flex-column d-flex gap-1 mr-2'>
                  <label>Prov.</label>
                  <input type='text' placeholder="(Es.MI)" name="prov_b" value={formData.prov_b} onChange={handleInputChange} style={{width:'80px'}}/>
              </div>
              <div className='flex-column d-flex gap-1'>
                  <label>Stato</label>
                  <input type='text' placeholder="(Es.Italia)" name="state_b" value={formData.state_b} onChange={handleInputChange} style={{width:'110px'}}/>
              </div>
          </div>
          <label>Codice Fiscale</label>
          <input type='text' placeholder="Es. DNTCRL65S67M126L" name="cf" value={formData.cf} onChange={handleInputChange}/>
          
          <label>Indirizzo Residenza</label>
          <div className='d-flex gap-2'>
            <input type='text' placeholder="Indirizzo di Residenza" name="indirizzo_res" value={formData.indirizzo_res} onChange={handleInputChange} style={{width:'200px'}}/>
            <input type='text' placeholder="Città Residenza" name="citta_res" value={formData.citta_res} onChange={handleInputChange} style={{width:'150px'}}/>
            <input type='text' placeholder="(Es.MI)" name="prov_res" value={formData.prov_res} onChange={handleInputChange} style={{width:'80px'}}/>
            <input type='text' placeholder="(Es.Italia)" name="stato_res" value={formData.stato_res} onChange={handleInputChange} style={{width:'110px'}}/>
          </div>

          <label>Indirizzo Domicilio</label>
          <div className='d-flex gap-2'>
            <input type='text' placeholder="Indirizzo di Domicilio" name="indirizzo_dom" value={formData.indirizzo_dom} onChange={handleInputChange} style={{width:'200px'}}/>
            <input type='text' placeholder="Città Domicilio" name="citta_dom" value={formData.citta_dom} onChange={handleInputChange} style={{width:'150px'}}/>
            <input type='text' placeholder="(Es.MI)" name="prov_dom" value={formData.prov_dom} onChange={handleInputChange} style={{width:'80px'}}/>
            <input type='text' placeholder="(Es.Italia)" name="stato_dom" value={formData.stato_dom} onChange={handleInputChange} style={{width:'110px'}}/>
          </div>

          <label>Email</label>
          <input type='email' name="email" value={formData.email} onChange={handleInputChange}/>
          <label>Cellulare</label>
          <input type='text' name="cellulare" value={formData.cellulare} onChange={handleInputChange}/>
          <button type='submit' className='mt-2' >Invia</button>

        </form>
    </>
  )
}

//addWorkers

const EditForm = ({params}:{params:any}) => {

  let type = params.type
  let id = params.id
  const divStyle = {
    width: '700px',
    padding: '60px',
  };

  
  return (
    <div className='d-flex '>
        <div  style={divStyle}  className='bg-primary rounded-4'> 
              { type == "students" && <EditStudents id={id}/>}
              { type == "courses" && <EditCourses id={id}/>}
              { type == "enti" && <EditEnti id={id}/>}
          </div>
    </div>
  
  )
}

export default EditForm