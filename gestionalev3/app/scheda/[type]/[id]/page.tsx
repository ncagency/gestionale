
'use client'
import { FC, useEffect, useState } from 'react';
import axios from 'axios';

// Import Navbar (update with the correct path)
import Link from 'next/link';
import { Rate,ViewCorsi,Debts } from '@/components';
import Row from '@/components/Row';
import TableRow from '@/components/TableRow';
import TableRowPermessi from '@/components/TableRowPermessi';
import { redirect } from 'next/dist/server/api-utils';
import { getWorkerIdFromCookie } from '@/components/Login';

interface UserDetailsProps {
    user: any;
    type: string;
    contabile:any;
    permessi:any;
  }
  
interface WorkerDetailsProps {
    user: any;
    type: string;
  }

interface CourseDetailsProps {
    course: any;
    type: string;
    contabile:any;
    permessi:any;
  }
interface EntiDetailsProps {
    ente: any;
    type: string;
    contabile: any;
    permessi:any;
  }

  

const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"

const styleBox = {
  background: "linear-gradient(to right, #3b83ff, #2a59ac)",
  cursor: "pointer"
}
const style = {
  background: "linear-gradient(to right, #3b83ff, #2a59ac)",
}

const style2 = {
  background: "linear-gradient(to right,  #a44b8b, #934c8a)",
  cursor: "pointer",
  width: '40px',
  height: '40px',
  padding: '60px',

}
const UserDetails: FC<UserDetailsProps> = ({ user, type, contabile, permessi }) => {
    
    const [fileNames, setFileNames] = useState([]);
    
    const [docCaricati, setDoccaricati] = useState(false)
  
    const id_user = user._id
    const rate: any = contabile.rate
    const corsi:any = user.corsi
    const redirec = (query:string) => {
      const destinationValue = query;
      window.location.href = destinationValue;
  }
  useEffect(() => {
    const fetchFileNames = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/files/${id_user}`);
        setFileNames(response.data.fileNames);
        setDoccaricati(true)
       
      } catch (error) {
        console.error('Errore durante il recupero dei nomi dei file:', error);
      }
    };
    if (type == "students") {
      fetchFileNames();
    }
  }, [id_user]);

  const handleFileDownload = async (fileName:any) => {
    try {
      // Sostituisci 'example.com' con l'indirizzo del tuo server remoto
      window.open(`${apiURL}/api/files/${id_user}/${fileName}`, '_blank');
    } catch (error) {
      console.error('Errore durante il download del file:', error);
    }
  };


 
    return (
        <>
            <div className="container flex-column align-content-center ">
                <h1>Dettagli { type == "students" ? "Studente" : "Worker"}</h1> 
                <div className='container m-4 d-flex '>
                    <table className="table table-bordered">
                        <tbody>
                            
                            <TableRow label="ID" value={user._id} />
                            <TableRow label="Nome" value={`${user.nome}${user.secondo_nome ? ` ${user.secondo_nome}` : ''}`}/>                      
                            <TableRow label="Cognome" value={user.cognome} />
                            <TableRow label="Sesso" value={user.sesso} />
                            <TableRow label="Data di Nascita" value={user.dob} />
                            <TableRow label="Luogo di Nascita" value={`${user.lob} (${user.prov_b}), ${user.state_b}`} />
                            <TableRow label="Codice Fiscale" value={user.cf} />
                            <TableRow label="Residenza" value={`${user.indirizzo_res}, ${user.citta_res} (${user.prov_res}), ${user.stato_res}`} />
                            <TableRow label="Domicilio" value={`${user.indirizzo_dom}, ${user.citta_dom} (${user.prov_dom}), ${user.stato_dom}`} />
                            <TableRow label="Cellulare" value={user.cellulare} />
                            <TableRow label="Email" value={user.email} />
                        </tbody>
                    </table>
                    <p onClick={() => redirec(`/modifica/students/${id_user}`)}  style={{cursor: "pointer"}} className='mx-4 text-primary'>Modifica</p>

                </div>
                
                {(type == "students" ) && 
                 <div className='d-flex gap-4'>
                    <div className='w-50'>
                      <ViewCorsi user_id={user._id} corsi_id={corsi}/>
                      </div>
                      <div className='w-50'>
                      <h1>Documenti</h1>
                      <div className='d-flex gap-2'>
                          <table className='table table-bordered'>
                            <tbody>
                            <TableRow label="Tipo" value={user.docs.doc_type} />
                            <TableRow label="Numero" value={user.docs.n_doc} />
                            <TableRow label="Luogo" value={user.docs.l_doc}  />
                            <TableRow label="Città" value={user.docs.city_doc} />
                            <TableRow label="Stato"  value={user.docs.state_doc}  />
                            <TableRow label="Emissione"  value={user.docs.emi}  />
                            <TableRow label="Scadenza"  value={user.docs.scad}  />

                            </tbody>

                          </table>
                          <div className='border border-2 m-2 rounded-4' style={{ width: '280px', height: '255px', overflowY: 'auto', padding: '20px' }}>
                            <div className='d-flex flex-column gap-2'>
                              {fileNames.map((fileName, index) => (
                                <div key={index} onClick={() => handleFileDownload(fileName)} style={{ cursor: 'pointer' }}>
                                  {fileName}
                                </div>
                              ))}
                            </div>
                          </div>
                      </div>
                      <div className='d-flex gap-4'>
                        { docCaricati == false && <div style={styleBox} className='d-flex p-2 w-25  bg-primary  text-white rounded-4' onClick={() => redirec(`/upload/${user._id}`)} >
                                    <p>Carica Documenti Identità</p>
                          </div>}
                          <div style={styleBox} className='d-flex p-2 w-25  bg-primary  text-white rounded-4' onClick={() => redirec(`/upload/docs/${user._id}`)} >
                                    <p>Altri Documenti</p>
                          </div>
                        </div>
                      </div>
                    </div> }
               
                {(type == "students" ) && 
                
                    
                <div style={style} className=' w-75 mt-4 p-3 text-white rounded-4'>
                     { permessi.seeContabile == true && (
                      <>
                      <h1>Totale:{contabile.totale} €</h1>
                      <h1>Saldati:{contabile.saldati} €</h1>
                      <h1>In Sospeso:{contabile.in_sospeso} €</h1>
                      </>)}
                      { permessi.pagaRate == true && <Debts rates={rate} userId={id_user} />}
              </div>
                  
            
                  }
                 
                  
                
                {(type == "workers" ) && 
                    <div className="row bg-primary mt-0">
                        <ul>
                            <li>
                                Permesso 1 | o Si o No // implementa permessi
                            </li>
                        </ul>
                    </div>}
            </div>

        </>
    )
}

const WorkerDetail: FC<WorkerDetailsProps> = ({ user, type }) => {

  const id_user = user._id

  const redirec = (query:string) => {
    const destinationValue = query;
    window.location.href = destinationValue;
}

//                  <p onClick={() => redirec(`/modifica/workers/${id_user}`)}  style={{cursor: "pointer"}} className='mx-4 text-primary'>Modifica</p>

  return (
      <>
          <div className="container flex-column align-content-center ">
              <h1>Dettagli Worker</h1> 
              <div className='container m-4 d-flex '>
                  <table className="table table-bordered">
                      <tbody>
                          
                          <TableRow label="ID" value={user._id} />
                          <TableRow label="Username" value={user.username} />
                          <TableRow label="Password" value={user.password} />
                          <TableRow label="Nome" value={`${user.nome}${user.secondo_nome ? ` ${user.secondo_nome}` : ''}`}/>                      
                          <TableRow label="Cognome" value={user.cognome} />
                          <TableRow label="Sesso" value={user.sesso} />
                          <TableRow label="Data di Nascita" value={user.dob} />
                          <TableRow label="Luogo di Nascita" value={`${user.lob} (${user.prov_b}), ${user.state_b}`} />
                          <TableRow label="Codice Fiscale" value={user.cf} />
                          <TableRow label="Residenza" value={`${user.indirizzo_res}, ${user.citta_res} (${user.prov_res}), ${user.stato_res}`} />
                          <TableRow label="Domicilio" value={`${user.indirizzo_dom}, ${user.citta_dom} (${user.prov_dom}), ${user.stato_dom}`} />
                          <TableRow label="Cellulare" value={user.cellulare} />
                          <TableRow label="Email" value={user.email} />
                      </tbody>
                  </table>

              </div>
              <h1>Permessi</h1>
              <table className="table table-bordered">
                      <tbody> 
                          <TableRowPermessi label="Contabile" value={user.permessi.seeContabile} />
                          <TableRowPermessi label="Cronologia" value={user.permessi.seeCronologia} />
                          <TableRowPermessi label="Rate" value={user.permessi.pagaRate} />
                          <TableRowPermessi label="Fatture" value={user.permessi.pagaFatture} />
                          <TableRowPermessi label="Aggiungi Stock" value={user.permessi.addStock} />
                          <TableRowPermessi label="Aggiungi Studenti" value={user.permessi.addStudents} />
                          <TableRowPermessi label="Aggiungi Corsi" value={user.permessi.addCourses} />
                          <TableRowPermessi label="Aggiungi Enti" value={user.permessi.addEnti} />
                      </tbody>
                  </table>
          </div>

      </>
  )
}

const CourseDetails: FC<CourseDetailsProps> = ({ course, type ,contabile, permessi}) => {

        const [usersData, setUsersData] = useState<any[]>([]);
        useEffect(() => {
          const fetchUsersData = async () => {
              try {
                  // Esegui la query per ottenere tutti gli utenti dal database
                  const response = await fetch(`${apiURL}/students`);
                  const userData = await response.json();
                  setUsersData(userData);
              } catch (error) {
                  console.error('Errore durante il recupero degli utenti dal database', error);
              }
          };
  
          fetchUsersData();
      }, []);
      
      const redirec = () => {
        const destinationValue = `/stock/`;
        window.location.href = destinationValue;
    }
       let utenti_iscritti = course.utenti       

       const filtrati = usersData.filter(oggetto => utenti_iscritti.includes(oggetto._id));
       
       let numero_utenti = filtrati.length
    

       
        if (!usersData) {
          return <p>Loading...</p>
        }
        return (
            <div className="container">
                
                <h1>Dettagli Corso</h1>
                <div className="row mt-5">
                    
                    <div className='d-flex gap-2'>
                      <div className="col-7"> 
                          <p className="mb-0">{course._id}</p>
                          <h2>{course.nome}</h2>
                          <h3>{course.ente}</h3>
                          <p>Numero Iscritti: {numero_utenti}</p>
                      </div>
                      <div className='col-5 w-50'>
                          { permessi.seeContabile == true && (<div style={style} className='bg-primary text-white p-3 rounded-4'>
                               { course.tipo != "Uni" && (contabile.stock < 10 && contabile.stock > 0) && <div className='bg-warning fs-4 p-3 rounded-3 m-2'>Stock in Esaurimento</div>} 
                                 { course.tipo != "Uni" &&  contabile.stock === 0 && <div className='bg-danger fs-4 p-3 rounded-3 m-2'>Stock Esaurito</div>} 
                                  <h2>Entrate {contabile.totale_entrate} €</h2>
                                  <h2>Uscite {contabile.totale_uscite} €</h2>
                                  <h2>Profit {contabile.totale_profit} €</h2>
                                  <hr />
                                  <div className='d-flex gap-4 fs-5'>
                          {  course.tipo != "Uni"  &&(<div className="d-flex gap-4"> <h4>Stock:{contabile.stock}</h4>
                                    <h4>Costo:{contabile.costo} €</h4></div>)}
                                    <h4>Venduti:{contabile.venduti}</h4>
                                  </div>
                                  { permessi.addStock == true && (<div style={{cursor:'pointer'}} onClick={redirec} className='bg-warning p-3 w-25 rounded-5 mt-5'> Stock</div>)}
                          </div>)}
                      
                      </div>
                     

                    </div>
                    <h1>Iscritti</h1>
          
                      <div className=' w-50 border border-2 m-2 rounded-4' style={{ height: '255px', overflowY: 'auto', padding: '20px' }}>
                      <div className='d-flex flex-column gap-2 '>
                        {
                              filtrati.map((utente, index) => (
                                <Row key={index} data={utente} type="students"/>
                              ))
                            }
                      </div>
                      </div>
                    
                </div>
              
            </div>
    )
}

const EntiDetails: FC<EntiDetailsProps> = ({ ente, type, contabile, permessi }) => {

  const [courseData, setCourseData] = useState<any[]>([]);
  useEffect(() => {
    const fetchUsersData = async () => {
        try {
            // Esegui la query per ottenere tutti gli utenti dal database
            const response = await fetch(`${apiURL}/courses`);
            const courseData = await response.json();
            setCourseData(courseData);
        } catch (error) {
            console.error('Errore durante il recupero degli utenti dal database', error);
        }
    };

    fetchUsersData();
}, []);

        
    let corsi_ente = ente.corsi    
    
    const filtrati = courseData.filter(oggetto => corsi_ente.includes(oggetto._id));
    
    if (!courseData) {
      return <p>Loading...</p>
    }
    const redirec = () => {
      const destinationValue = `/upload/fattura/${ente._id}`;
      window.location.href = destinationValue;
  }
  
    

    return (
        <>
            <div className="container">
                <h1>Dettagli {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                <div className="row mt-5">
                    <div className=" d-flex w-100 gap-4 "> 
                        
                      <table className="table table-bordered">
                          <tbody>
                              
                              <TableRow label="ID" value={ente._id} />
                              <TableRow label="Nome" value={ente.nome} />
                              <TableRow label="Indirizzo" value={`${ente.indirizzo}, ${ente.citta} (${ente.prov}), ${ente.stato}`}/>                      
                              <TableRow label="P.IVA" value={ente.piva} />
                              <TableRow label="Email" value={ente.email} />
                              <TableRow label="Cellulare" value={ente.cellulare} />
                              <TableRow label="Altri Contatti" value={ente.note} />

                          </tbody>
                    </table>


                         <div className='w-75 d-flex gap-5 border border-2 ml-5 rounded-4 p-4 h-50 ' style={style}>
                          { permessi.seeContabile == true && (<><div>
                              <label className='w-25 fs-5 text-warning'>Totale</label>
                              <p className='fs-4 text-white'> {contabile.totale} €</p>
                            </div>
                            <div>
                              <label className='w-25 fs-5 text-warning'>Saldati</label>
                              <p className='fs-4 text-white'>{contabile.inviati} €</p>
                            </div>
                            <div>
                              <label className='w-25 fs-5 text-warning'>Inviare</label>
                              <p className='fs-4 text-white'>{contabile.da_inviare} €</p>
                            </div></>)}
                           { permessi.pagaFatture == true && (<div style={style2} className=' p-1 text-white rounded-4' onClick={redirec} >
                                  <p className='fs-5'></p>
                         </div>)}
                         </div>
                      </div>
                  
                      <div className='w-100 border border-2 m-2 rounded-4 row' style={{height: '255px', overflowY: 'auto', padding: '20px' }}>
                        <div className='d-flex flex-column gap-2 '>
                          {
                                filtrati.map((corso, index) => (
                                  <Row key={index} data={corso} type="courses"/>
                                ))
                              }
                        </div>
                    </div>
                   
                </div>
              
            </div>

        </>
    )
}


const Details = ({data,type,contabile,permessi}:{ data:any, type:any, contabile:any, permessi:any}) => {
    
  if (type == "workers") {
    if (!data ) {
      return <p>Loading...</p>; // o qualsiasi altra logica per gestire il caricamento
    } 
  } else {
    if (!data || !contabile ) {
      return <p>Loading...</p>; // o qualsiasi altra logica per gestire il caricamento
    } 
  }


  
    return (
      <>
        { type == "students"  && (<UserDetails user={data} type={type} contabile={contabile} permessi={permessi}/>)}
        { type == "workers" && (<WorkerDetail user={data} type={type}  />)}
        { type == "courses" && (<CourseDetails course={data} type={type} contabile={contabile} permessi={permessi}/>)}
        { type == "enti" && (<EntiDetails ente={data} type={type} contabile={contabile}  permessi={permessi}/>)}
      </>
    );
  };






function tabDetails({ params }:{params:any}){
  

    const apiUrlx = `${apiURL}/${params.type}/${params.id}`;
    const apiUrl_contabile = `${apiURL}/contabile/${params.type}/${params.id}`;

    const [data,setData] = useState(null);
    const [contabileData, setContabileData] = useState(null)
    const [permessi,setPermessi] = useState<any>()


    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/${params.type}/${params.id}`);
        setData(response.data)
        
        if (params.type != "workers") {
          const response2 = await axios.get(apiUrl_contabile);
          setContabileData(response2.data)
        } else {
          let cont = null
          setContabileData(cont)
        }
        let worker_id = getWorkerIdFromCookie()
        const response3 = await axios.get(`${apiURL}/workers/${worker_id}`);
        setPermessi(response3.data.permessi)
      } catch (error) {
        console.error('Errore durante la richiesta GET:', error);
      }
    };
    
  

    // Esegui la richiesta GET quando il componente si monta
    useEffect(() => {

      fetchData();
    }, []); // Assicurati di passare un array vuoto come secondo argomento per eseguire l'effetto solo al mount del componente

    const redirec = () => {
      const destinationValue = `/search/${params.type}`;
      window.location.href = destinationValue;
  }
    
    let link = `/search/${params.type}`

    const handleDelete = async (id:any) => {
      try {
          // Chiedi all'utente conferma prima di procedere con l'eliminazione
          const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo elemento?");
  
          // Se l'utente ha confermato l'eliminazione, procedi
          if (confirmDelete) {
              const response = await fetch(`${apiURL}/elimina/${params.type}/${id}`, {
                  method: 'DELETE',
              });
  
              if (!response.ok) {
                  const errorMessage = await response.text();
                  throw new Error(`Errore durante l'eliminazione: ${errorMessage}`);
               
              }
  
              // Se l'eliminazione è avvenuta con successo, puoi fare qualcosa, ad esempio aggiornare lo stato del tuo componente.
              console.log(`Elemento con ID ${id} eliminato con successo`);
  
              // Aggiorna lo stato o esegui altre azioni necessarie dopo l'eliminazione.
          } else {
              console.log("Eliminazione annullata dall'utente");
          }
  
      } catch (error) {
          console.error('Errore durante l\'eliminazione');
          // Gestisci l'errore in base alle tue esigenze, ad esempio visualizzando un messaggio di errore all'utente.
      }
  };
  

    if (!permessi) {
      return "Loading..."
    }
 
    return (
        <div className="col-md-10 p-4">
            <div>
            <Link  href={link}><p>Indietro</p></Link>
            { params.type != "courses" && params.type != "enti" && <p onClick={() => handleDelete(params.id)}>Elimina</p>}
            </div>
            <Details data={data} type={params.type} contabile={contabileData} permessi={permessi} />


            
            
        </div>
    );
  };
  


export default tabDetails;