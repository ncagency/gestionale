'use client'
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';

// Import Navbar (update with the correct path)
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import Rate from '@/app/components/Rate';

interface UserDetailsProps {
    user: any;
    type: string;
  }
interface CourseDetailsProps {
    course: any;
    type: string;
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



const UserDetails: FC<UserDetailsProps> = ({ user, type }) => {
    
    
    const [title, setTitle] = useState("");

    useEffect(() => {
   
      if (type == "workers") {
        setTitle("Lavoratore");
      } else {
        setTitle("Studente");
      }
    }, [type]); 
    const id_user = user._id
    const rate: any = user.payments.rate
    let nrate = rate.length
    return (
        <>
            <div className="container">
                <h1>Dettagli {title}</h1>
                <div className='m-4 d-flex '>
                    <table className="table table-bordered">
                        <tbody>
                            
                            <TableRow label="ID" value={user._id} />
                            <TableRow label="Nome" value={`${user.info.nome}${user.info.secondo_nome ? ` ${user.info.secondo_nome}` : ''}`}/>                            <TableRow label="Cognome" value={user.info.cognome} />
                            <TableRow label="Sesso" value={user.info.sesso} />
                            <TableRow label="Data di Nascita" value={user.info.dob} />
                            <TableRow label="Luogo di Nascita" value={`${user.info.lob} (${user.info.prob}), ${user.info.state}`} />
                            <TableRow label="Codice Fiscale" value={user.info.cf} />
                            <TableRow label="Residenza" value={`${user.info.res}, ${user.info.res_city} (${user.info.res_prov}), ${user.info.state_res}`} />
                            <TableRow label="Domicilio" value={`${user.info.dom}, ${user.info.dom_city} (${user.info.dom_prov}), ${user.info.state_dom}`} />
                            <TableRow label="Cellulare" value={user.info.cellulare} />
                            <TableRow label="Email" value={user.info.email} />
                        </tbody>
                    </table>
                    {(type == "students" ) && 
                  <>
                    
                    <div className='container'>
                        <h1>Totale:{user.payments.totale}</h1>
                        <h1>Saldati:{user.payments.saldati}</h1>
                        <h1>In Sospeso:{user.payments.in_sospeso}</h1>
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
                      <h1>Corsi</h1>




                      </div>
                      <div>
                      <h1>Documenti</h1>
                      <table className='table table-bordered'>
                        <tbody>
                           <TableRow label="Numero" value={user.docs.n_doc} />
                           <TableRow label="Tipo" value=  {user.docs.tipo} />
                           <TableRow label="Luogo Rilascio" value={user.docs.l_doc} />
                           <TableRow label="Citta" value={user.docs.city_doc} />
                           <TableRow label="Data Emissione" value={user.docs.rilascio_doc} />
                           <TableRow label="Data Scadenza " value=  {user.docs.scadenza_doc} />
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
 
const CourseDetails: FC<CourseDetailsProps> = ({ course, type }) => {
 
        return (
        <>
            <div className="container">
                Indietro
                <h1>Dettagli {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                <div className="row mt-5">
                    <div className="col-7"> 
                        <p className="mb-0">{course._id}</p>
                        <h2>{course.nome}</h2>
                        <h3>{course.ente}</h3>
                    </div>
                    <div className="col-5 text-right ml-auto">
                        <p className="mb-1"></p>
                        <p></p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-7">
                            <label>
                            Data di Nascita:
                        </label>
                        <h2></h2>
                        <label>
                            Luogo di Nascita:
                        </label>
                        <h2></h2>
                        <label>
                          
                        </label>
                    </div>
                    <div className="col-5 bg-primary text-white p-3 border rounded-3 fs-3 ">
                        <label className="fs-5">
                            Pagamenti:
                        </label>
                        <p className="mb-0 mt-4">Tot: </p>
                        <p className="mb-0">Ricevuti: </p>
                        <p className="mb-0">In Sospeso: </p>
                    </div>
                </div>
                <div className="row mt-4">
                    
                    <div className="col-4">
                        <label>
                            Indirizzo Residenza:
                        </label>
                        <h3></h3>
                        <p></p>
                    </div>
                    <div className="col-4">
                        <label>
                            Indirizzo di Domicilio
                        </label>
                        <h3></h3>
                        <p></p>
                    </div>
                  
                </div>
            </div>

        </>
    )
}

const EntiDetails: FC<EntiDetailsProps> = ({ ente, type }) => {
    return (
        <>
            <div className="container">
                Indietro
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


const Details = ({ data, type }) => {
    if (!data) {
      return <p>Loading...</p>; // o qualsiasi altra logica per gestire il caricamento
    }
    return (
      <>
        { (type == "students" || type == "workers") && (<UserDetails user={data} type={type} />)}
        { type == "courses" && (<CourseDetails course={data} type={type} />)}
        { type == "enti" && (<EntiDetails ente={data} type={type} />)}
      </>
    );
  };

const tabDetails: FC<TabDetailsProps> = ({ params }) => {
  
   
    
    const apiUrl = `http://localhost:2000/${params.type}/${params.id}`;

    const [data,setData] = useState(null);
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data)
      } catch (error) {
        console.error('Errore durante la richiesta GET:', error);
      }
    };
  
    // Esegui la richiesta GET quando il componente si monta
    useEffect(() => {
      fetchData();
    }, []); // Assicurati di passare un array vuoto come secondo argomento per eseguire l'effetto solo al mount del componente



    let link = `/search/${params.type}`

    return (
      <div className="container-fluid d-flex flex-row">
        <Navbar />
        <div className="col-md-10 p-4">
            <Link  href={link}><p>Indietro</p></Link>
            <Details data={data} type={params.type}/>
        </div>
      </div>
    );
  };
  


export default tabDetails;