'use client'

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { getWorkerIdFromCookie } from '@/components/Login'

const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"




const redirec = (id:any, type:any) => {
  const destinationValue = `/scheda/${type}/${id}`;
  window.location.href = destinationValue;
}

const AddCourses = (permessi:any) => {
  
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
      const response = await axios.post(`${apiURL}/add/corso`, formData);
      redirec(response.data.data, 'courses')

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

    // Clean-up function to cancel any ongoing requests if the component unmounts
    return () => {
      // Cleanup logic, e.g., cancel any ongoing requests
    };
  }, []); // Empty dependency array to ensure the effect runs only once after initial render

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (permessi.addCourses == false) {
    return (<div className='h-100 d-flex justify-content-center align-items-center'>

    <h1 className='text-white'>Non hai i pemessi necessari per accedere a questa pagina</h1>

</div>)
  } else {
  return (
    <>
        <form className='d-flex flex-column align-items-center gap-2 '>
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
          
          <button onClick={handleSubmit} className='mt-2' >Invia</button>
        </form>
    </>
  )
}}

const AddEnti = (permessi:any)  => {
  
  const [formData,setFormData] = useState({
    nome:'',
    indirizzo:'',
    citta:'',
    prov:'',
    stato:'',
    piva:'',
    email:'',
    cellulare:'',
    altri_contatti:'',
    corsi:[]
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
      const response = await axios.post(`${apiURL}/add/ente`, formData);
      redirec(response.data.data._id, 'enti')
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
    }
  };

  if (permessi.addEnti == false) {
    return (<div className='h-100 d-flex justify-content-center align-items-center'>

    <h1 className='text-white'>Non hai i pemessi necessari per accedere a questa pagina</h1>

</div>)
  } else {return (
    <>
        <form className='d-flex flex-column align-items-center gap-2 '>
          
          <div className='d-flex gap-4'>
              <div className='d-flex flex-column'>
              <label>Nome</label>
              <input type='text' name="nome" value={formData.nome} onChange={handleInputChange}/>
              </div>
              <div className='d-flex flex-column'>
              <label>P.IVA</label>
          <input type='text' name="piva" value={formData.piva} onChange={handleInputChange} />
              </div>
          </div>
    
          <div className='d-flex gap-4'>
            <div className='d-flex flex-column'>
            <label>Indirizzo</label>
          <input type='text' name="indirizzo" value={formData.indirizzo} onChange={handleInputChange}/>
          
        
         
              
                <label>Stato</label>
                <input type='text' name="stato" value={formData.stato} onChange={handleInputChange} />
              </div>
                <div className='d-flex flex-column'>
                    
              <label>Città</label>
                <div className='d-flex'>
                  <input type='text' placeholder="Città" name="citta" value={formData.citta} onChange={handleInputChange} style={{width:'180px'}}/>
                  <input type='text' placeholder="(Es. MI)" name="prov" value={formData.prov} onChange={handleInputChange} style={{width:'75px'}}/>
                </div>
                </div>
          </div>
          <div className='d-flex gap-4'>
              <div className='d-flex flex-column'>
                <label>Email</label>
                <input  type='email' name="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className='d-flex flex-column'>
                <label>Cellulare</label>
                <input type='text' placeholder="+Prefisso" name="cellulare" value={formData.cellulare} onChange={handleInputChange} />
              </div>
          </div>
          <div className='d-flex flex-column gap-2 mt-4'>
          <label>Altri contatti</label>
          <textarea name="altri_contatti" value={formData.altri_contatti} onChange={handleInputChange} className='form-control'></textarea>
          </div>

          <button onClick={handleSubmit} className='mt-2' >Invia</button>
        </form>
    </>
  )
}}

const AddStudents = (permessi:any) => {
  
  const [formData,setFormData] = useState({
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
      const response = await axios.post(`${apiURL}/add/student`, formData);
      redirec(response.data.data._id, 'students')
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
    }
  };

  if (permessi.addStudents == false) {
    return (<div className='h-100 d-flex justify-content-center align-items-center'>

    <h1 className='text-white'>Non hai i pemessi necessari per accedere a questa pagina</h1>

</div>)
  } else {
    return (
      <>
          <form className='d-flex flex-column align-items-center gap-2 '>
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
            <button onClick={handleSubmit} className='mt-2' >Invia</button>
  
          </form>
      </>
    )
  }
  
}

const AddWorkers = (permessi:any) => {
  
  const [formData,setFormData] = useState({
    username:'',
    password:'',
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
    permessi:{
      seeContabile:false,
      seeCronologia:false,
      pagaRate:false,
      pagaFatture:false,
      addStock:false,
      addEnti:false,
      addCourses:false,
      addStudents:false
    },
  })

  const handleInputChange = (e:any) => {
    const {name , value} = e.target;
    console.log(e.target)
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    console.log(name)
    setFormData((prevFormData) => ({
      ...prevFormData,
      permessi: {
        ...prevFormData.permessi,
        [name]: checked
      }
    }));
  };
  

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/add/worker`, formData);
      redirec(response.data.data._id, 'workers')
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
    }
  };

  return (
    <>
        <form className='d-flex flex-column align-items-center gap-2 '>

          <div className='d-flex gap-2'>
            <input type='text' placeholder="Username" name="username" value={formData.username} onChange={handleInputChange} style={{width:'150px'}}/>
            <input type='password' placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} style={{width:'150px'}}/>
          </div>
       
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
          <div className='d-flex gap-4'>
            <div className='d-flex flex-column align-items-center'>
              <label>Email</label>
              <input type='email' name="email" value={formData.email} onChange={handleInputChange}/>
            </div>
            <div className='d-flex flex-column align-items-center'>
              <label>Cellulare</label>
              <input type='text' name="cellulare" value={formData.cellulare} onChange={handleInputChange}/>
            </div>
          </div>
         
          <div className='d-flex flex-column align-items-between  w-75 gap-2 bg-warning p-3 rounded-4 m-4'>

          <label className='fs-3'>Permessi</label>

            <div className='d-flex justify-content-between gap-2'>
              <label>Visualizza Contabile:</label>
              <input type='checkbox' name="seeContabile" checked={formData.permessi.seeContabile} onChange={handleCheckboxChange}/>
            </div>

            <div className='d-flex justify-content-between  gap-2'>
              <label>Visualizza Cronologia:</label>
              <input type='checkbox' name="seeCronologia" checked={formData.permessi.seeCronologia} onChange={handleCheckboxChange}/>
            </div>

            <div className='d-flex justify-content-between  gap-2'>
              <label>Paga Rate:</label>
              <input type='checkbox' name="pagaRate" checked={formData.permessi.pagaRate} onChange={handleCheckboxChange}/>
            </div>

            <div className='d-flex justify-content-between  gap-2'>
              <label>Paga Rate:</label>
              <input type='checkbox' name="pagaFatture" checked={formData.permessi.pagaFatture} onChange={handleCheckboxChange}/>
            </div>

            <div className='d-flex justify-content-between  gap-2'>
              <label>Aggiungi Stock:</label>
              <input type='checkbox' name="addStock" checked={formData.permessi.addStock} onChange={handleCheckboxChange}/>
            </div>

            <div className='d-flex justify-content-between  gap-2'>
              <label>Aggiungi Studenti:</label>
              <input type='checkbox' name="addStudents" checked={formData.permessi.addStudents} onChange={handleCheckboxChange}/>
            </div>

            <div className='d-flex justify-content-between  gap-2'>
              <label>Aggiungi Corsi:</label>
              <input type='checkbox' name="addCourses" checked={formData.permessi.addCourses} onChange={handleCheckboxChange}/>
            </div>


            <div className='d-flex justify-content-between  gap-2'>
              <label>Aggiungi Enti:</label>
              <input type='checkbox' name="addEnti" checked={formData.permessi.addEnti} onChange={handleCheckboxChange}/>
            </div>

          </div>
          <button onClick={handleSubmit} className='mt-2' >Invia</button>

        </form>
    </>
  )
}
//addWorkers

function AddForm({params} : {params:any}){

  const [permessi,setPermessi] = useState<any>()
  let type = params.type
  let worker_id = getWorkerIdFromCookie()

  useEffect(() => {
    const fetch = async () => {
    
        const response2 = await axios.get(`${apiURL}/workers/${worker_id}`);
        setPermessi(response2.data.permessi)

    }
    fetch()
   })

  
  const divStyle = {
    width: '700px',
    padding: '60px',
    background: "linear-gradient(to right, #3b83ff, #2a59ac)",

  };

  if (!permessi) {
    return "Loading..."
  }

  return (
    <div className='d-flex '>
        <div  style={divStyle}  className='bg-primary rounded-4'> 
              { type == "students" && <AddStudents permessi={permessi}/>}
              { type == "courses" && <AddCourses permessi={permessi}/>}
              { type == "enti" && <AddEnti permessi={permessi}/>}
              { type == "workers" && <AddWorkers permessi={permessi}/>}
          </div>
    </div>
  )};

export default AddForm