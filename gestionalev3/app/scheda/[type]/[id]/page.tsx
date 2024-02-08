
'use client'
import { FC, useEffect, useState } from 'react';
import axios from 'axios';

// Import Navbar (update with the correct path)
import Link from 'next/link';
import { Rate,ViewCorsi } from '@/components';


interface UserDetailsProps {
    user: any;
    type: string;
    contabile:any
  }
interface CourseDetailsProps {
    course: any;
    type: string;
    contabile:any;
  }
interface EntiDetailsProps {
    ente: any;
    type: string;
  }
interface TabDetailsProps {
  params:{
    type: string;
    id: string;
}
  }

  const TableRow = ({ label, value }) => (
   
   <tr className="border-1 p-4">
        <td>{label}</td>
        <td>{value}</td>
    </tr>
);



const UserDetails: FC<UserDetailsProps> = ({ user, type, contabile }) => {
    
    
    const [title, setTitle] = useState("");
 
    useEffect(() => {
   
      if (type == "workers") {
        setTitle("Lavoratore");
      } else {
        setTitle("Studente");
      }
    }, [type]); 
    const id_user = user._id
    const rate: any = contabile.rate
    let nrate = rate.length
    const corsi:any = user.corsi
    return (
        <>
            <div className="container">
                <h1>Dettagli {title}</h1>
                <div className='m-4 d-flex '>
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
                    {(type == "students" ) && 
                  <>
                    
                    <div className='container'>
                        <h1>Totale:{contabile.totale}</h1>
                        <h1>Saldati:{contabile.saldati}</h1>
                        <h1>In Sospeso:{contabile.in_sospeso}</h1>
                        <div>
                        <p>Rate:{nrate}</p>
                        <Rate data={rate} id={id_user}/>
                        </div>
                    </div>
                  
                    </>
                  }
                </div>
                <div className=''>
                    
                {(type == "students" ) && 
                 <div className='d-flex gap-4'>
                    <div className='w-50'>
                      <ViewCorsi user_id={user._id} corsi_id={corsi}/>
                      </div>
                      <div>
                      <h1>Documenti</h1>
                      <table className='table table-bordered'>
                        <tbody>
                          
                        </tbody>

                      </table>
                      </div>
                    </div> }

                </div>
              
                 
                  
                
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
 
const CourseDetails: FC<CourseDetailsProps> = ({ course, type ,contabile}) => {

        const [usersData, setUsersData] = useState<any[]>([]);
    
        useEffect(() => {
          const fetchUsersData = async () => {
              try {
                  // Esegui la query per ottenere tutti gli utenti dal database
                  const response = await fetch('http://127.0.0.1:2000/students');
                  const userData = await response.json();
                  setUsersData(userData);
              } catch (error) {
                  console.error('Errore durante il recupero degli utenti dal database', error);
              }
          };
  
          fetchUsersData();
      }, []);
  
       let utenti_iscritti = course.utenti       

       const filtrati = usersData.filter(oggetto => utenti_iscritti.includes(oggetto._id));
       let numero_utenti = filtrati.length
    // Stampa dell'array risultante
        if (!usersData) {
          return <p>Loading...</p>
        }
        return (
            <div className="container">
                
                <h1>Dettagli Corso</h1>
                <div className="row mt-5">
                    <div className="col-7"> 
                        <p className="mb-0">{course._id}</p>
                        <h2>{course.nome}</h2>
                        <h3>{course.ente}</h3>
                        <p>Numero Iscritti: {numero_utenti}</p>
                    </div>
                    <div>
                    {
                      filtrati.map((utente, index) => (
                        <p key={index}>{utente.nome}</p>
                      ))
                    }

                    </div>
                    
                </div>
              
            </div>
    )
}

const EntiDetails: FC<EntiDetailsProps> = ({ ente, type }) => {
    return (
        <>
            <div className="container">
                <h1>Dettagli {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                <div className="row mt-5">
                    <div className="col-7"> 
                        <p className="mb-0">{ente._id}</p>
                        <h2>{ente.nome}</h2>
                        <h3>{ente.indirizzo} {ente.citta} ({ente.prov}), {ente.stato}</h3>
                        <h3>{ente.email} {ente.cellulare}</h3>
                        <p>
                           {ente.note}
                        </p>
                    </div>
                   
                </div>
              
            </div>

        </>
    )
}


const Details = ({ data, type, contabile }) => {
    if (!data || !contabile) {
      return <p>Loading...</p>; // o qualsiasi altra logica per gestire il caricamento
    }
    return (
      <>
        { (type == "students" || type == "workers") && (<UserDetails user={data} type={type} contabile={contabile}/>)}
        { type == "courses" && (<CourseDetails course={data} type={type} contabile={contabile}/>)}
        { type == "enti" && (<EntiDetails ente={data} type={type} contabile={contabile}/>)}
      </>
    );
  };






const tabDetails: FC<TabDetailsProps> = ({ params }) => {
  
   
    
    const apiUrl = `http://localhost:2000/${params.type}/${params.id}`;
    const apiUrl_contabile = `http://localhost:2000/contabile/${params.type}/${params.id}`;

    const [data,setData] = useState(null);
    const [contabileData, setContabileData] = useState(null)

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data)
        const response2 = await axios.get(apiUrl_contabile);
        setContabileData(response2.data)
       
      } catch (error) {
        console.error('Errore durante la richiesta GET:', error);
      }
    };
  
    // Esegui la richiesta GET quando il componente si monta
    useEffect(() => {
      fetchData();
    }, []); // Assicurati di passare un array vuoto come secondo argomento per eseguire l'effetto solo al mount del componente


    
    let link = `/search/${params.type}`
    
    const handleDelete = async (id) => {
      try {
          // Chiedi all'utente conferma prima di procedere con l'eliminazione
          const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo elemento?");
  
          // Se l'utente ha confermato l'eliminazione, procedi
          if (confirmDelete) {
              const response = await fetch(`http://localhost:2000/elimina/${params.type}/${id}`, {
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
          console.error('Errore durante l\'eliminazione:', error.message);
          // Gestisci l'errore in base alle tue esigenze, ad esempio visualizzando un messaggio di errore all'utente.
      }
  };
    return (
        <div className="col-md-10 p-4">
            <div>
            <Link  href={link}><p>Indietro</p></Link>
            <p onClick={() => handleDelete(params.id)}>Elimina</p>
            </div>
            <Details data={data} type={params.type} contabile={contabileData}/>


            
            
        </div>
    );
  };
  


export default tabDetails;