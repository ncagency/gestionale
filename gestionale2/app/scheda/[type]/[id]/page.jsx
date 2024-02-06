'use client'
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// Import Navbar (update with the correct path)
import Navbar  from '@/app/components/Navbar';
import Link from 'next/link';




const table_style = "border p-2";
const UserDetails = ({ user, type }) => {
    
    const [title, setTitle] = useState("");

    useEffect(() => {
   
      if (type === "workers") {
        setTitle("Lavoratore");
      } else {
        setTitle("Studente");
      }
    }, [type]); 
  
   return(
        <>
            <div className="flex flex-col">
             <h1>Dettagli {title} </h1>
                
                <div className='flex gap-4'>
                    <div className='p-4 '> 

                        <table className='table-auto w-full border border-collapse'>
                                <tbody>
                                    <tr>
                                        <td className={table_style}>ID</td>
                                        <td className={table_style}>{user._id}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Nome</td>
                                        <td className={table_style}>{user.info.nome} {user.info.secondo_nome}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Cognome</td>
                                        <td className={table_style}>{user.info.cognome}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Sesso</td>
                                        <td className={table_style}>{user.info.sesso}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Data di Nascita</td>
                                        <td className={table_style}>{user.info.dob}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Luogo di Nascita</td>
                                        <td className={table_style}>{user.info.city} ({user.info.prov}), {user.info.state}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Codice Fiscale</td>
                                        <td className={table_style}>{user.info.cf} </td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Residenza</td>
                                        <td className={table_style}>{user.info.residenza.addr}, {user.info.residenza.city} ({user.info.residenza.prov}), {user.info.residenza.state}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Domicilio</td>
                                        <td className={table_style}>{user.info.domicilio.addr}, {user.info.domicilio.city} ({user.info.domicilio.prov}), {user.info.domicilio.state}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Cellulare</td>
                                        <td className={table_style}>{user.info.telefono}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Email</td>
                                        <td className={table_style}>{user.info.email}</td>              
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                    {(type == "students" ) && 
                    <div className='p-4'>
                        <table className='table-auto w-full border border-collapse'>
                                <tbody>
                                    <tr>
                                        <td className={table_style}>Totale</td>
                                        <td className={table_style}>{user.payments.totale}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Saldati</td>
                                        <td className={table_style}>{user.payments.saldati}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>In Sospeso</td>
                                        <td className={table_style}>{user.payments.in_sospeso}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Costo</td>
                                        <td className={table_style}>{user.payments.costo}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Profitto</td>
                                        <td className={table_style}>{user.payments.profitto}</td>              
                                    </tr>
                                </tbody>
                        </table>
                        
                    </div>}
                    {(type == "workers" ) && 
                    <div className='p-4 '>
                        <div>
                            <h1>Permessi</h1>
                        </div>
                    </div>}
                </div>
                

               
            </div>

        </>
    )
}
 
const CourseDetails = ({ course, type }) => {
 
        return (
        <>
            <div className='flex flex-col'>
                <h1>Dettagli Corso</h1>
                
                <div className='p-4 flex gap-4 '>
                    <table className='table-auto w-1/3 border border-collapse'>
                                    <tbody>
                                        <tr>
                                            <td className={table_style}>ID</td>
                                            <td className={table_style}>{course._id}</td>              
                                        </tr>
                                        <tr>
                                            <td className={table_style}>Nome</td>
                                            <td className={table_style}>{course.nome}</td>              
                                        </tr>
                                        <tr>
                                            <td className={table_style}>Ente</td>
                                            <td className={table_style}>{course.ente}</td>              
                                        </tr>
                                        <tr>
                                            <td className={table_style}>Iscritti</td>
                                            <td className={table_style}>{course.n_iscritti}</td>              
                                        </tr>
                                        
                                    </tbody>
                        </table>
                        <div className='w-1/3 border border-4 border-black p-4'>
                                    <p>Entrate:{course.payments.entrate}</p>
                                    <p>Costi:{course.payments.costi}</p>
                                    <p>Profitto:{course.payments.entrate - course.payments.costi}</p>
                                    <p>Stock:{course.payments.stock}</p>
                                
                    </div>  
                </div>
                <div>
                    Utenti Lista:
                </div>
            </div>

        </>
    )
}

const EntiDetails  = ({ ente, type }) => {
    return (
        <>
            <div className='flex flex-col'>
                <h1>Dettagli Ente</h1>
                <div className='p-4 flex gap-4 '> 

                        <table className='table-auto w-1/3 border border-collapse'>
                                <tbody>
                                    <tr>
                                        <td className={table_style}>ID</td>
                                        <td className={table_style}>{ente._id}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Nome</td>
                                        <td className={table_style}>{ente.nome}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Indrizzo</td>
                                        <td className={table_style}>{ente.indirizzo}, {ente.citta} ({ente.prov}), {ente.stato}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Email</td>
                                        <td className={table_style}>{ente.email}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Cellulare</td>
                                        <td className={table_style}>{ente.cellulare}</td>              
                                    </tr>
                                    {
                                    ente.altri_contatti.map((contatto, index) => (
                                        <tr key={index}>
                                            <td className={table_style}>{contatto.nome}</td>
                                            <td className={table_style}>{contatto.contatto}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                        </table>

                        <div className='w-1/3 border border-4 border-black p-4'>
                                <p>Totale:{ente.payments.totale_dadare}</p>
                                <p>Saldati:{ente.payments.saldati}</p>
                                <p>Saldati:{ente.payments.da_saldare}</p>
                            
                        </div>       
                        <div className='w-1/3 border border-4 border-black p-4'>
                                   { ente.fatture.map((fattura, index) => (
                                    <p key={index}>Fattura n.</p>
                                   ))}
                        </div>            
                </div>
                <h1> Corsi:</h1>
                <div className='w-full border-4 border-black'>
                  //Corsi collegati
                </div>
              
            </div>

        </>
    )
}


const Details = ({ data, type }) => {
    if (!data) {
        return "Loading..."
    }
    return (
      <>
        { (type == "students" || type == "workers") && (<UserDetails user={data} type={type} />)}
        { type == "courses" && (<CourseDetails course={data} type={type} />)}
        { type == "enti" && (<EntiDetails ente={data} type={type} />)}
      </>
    );
  };


const tabDetails = ({ params }) => {
  
   
    
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
      <div className="flex w-screen">
        <Navbar />
        <div className="p-4 w-full ">
            <Link  href={link}><p className='text-blue-700'>Indietro</p></Link>
            <Details data={data} type={params.type}/>
        </div>
      </div>
    );
  };
  


export default tabDetails;