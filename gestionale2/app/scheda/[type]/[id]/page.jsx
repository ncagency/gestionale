'use client'
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// Import Navbar (update with the correct path)
import Navbar  from '@/app/components/Navbar';
import Link from 'next/link';

const student = {
    info: {
        nome: 'Mario',
        secondo_nome: 'Rossi',
        cognome: 'Bianchi',
        dob: '15-02-1995',
        city: 'Milano',
        prov: 'MI',
        state: 'Italia',
        sesso: 'Maschio',
        cf: 'RSSMRA95M15H501Z',
        res_addr: 'Via Roma, 123',
        res_city: 'Milano',
        res_prov: 'MI',
        res_state: 'Lombardia',
        dom_addr: 'Via Garibaldi, 456',
        dom_city: 'Roma',
        dom_prov: 'RM',
        dom_state: 'Lazio',
        telefono: '1234567890',
        email: 'mario.rossi@example.com',
    },
    corsi: [
        {
            corso_id: 'corso123',
            data_iscrizione: '01-03-2023',
            anno_accademico: '2023-2024',
            costo_tot: '5000',
            rate: 3,
            scadenze: [
                { data: '01-04-2023', saldato: true },
                { data: '01-05-2023', saldato: true },
                { data: '01-06-2023', saldato: false }
            ]
        }
    ],
    payments: {
        totale: 5000,
        saldati: 3000,
        in_sospeso: 2000,
        costo: 4000,
        profitto: 1000
    },
    docs: {
        identita: {
            n_doc: 'AZ123456',
            luogo_emi: 'Milano',
            citta: 'Milano',
            stato: 'Italia',
            paths: {
                fronte: '/path/fronte.jpg',
                retro: '/path/retro.jpg',
            }
        },
        altro: {
            nome: 'Diploma',
            path: '/path/diploma.pdf'
        }
    }
};

const ente = {

}


const UserDetails = ({ user, type }) => {
    
    const table_style = "border p-2";
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
                                        <td className={table_style}>{user.info.res_addr}, {user.info.res_city} ({user.info.res_prov}), {user.info.res_state}</td>              
                                    </tr>
                                    <tr>
                                        <td className={table_style}>Domicilio</td>
                                        <td className={table_style}>{user.info.dom_addr}, {user.info.dom_city} ({user.info.dom_prov}), {user.info.dom_state}</td>              
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
            <div className="container">
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

const EntiDetails  = ({ ente, type }) => {
    return (
        <>
            <div className="container">
                <h1>Dettagli {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                <div className="row mt-5">
                    <div className="col-7"> 
                        <p className="mb-0">{ente._id}</p>
                        <h2>{ente.nome}</h2>
                        <h3>{ente.city} {ente.prob}</h3>
                    </div>
                    <div className="col-5 text-right ml-auto">
                        <p className="mb-1"></p>
                        <p>{ente.payments.da_dare} {ente.payments.da_ricevere} || </p>
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
        { (type == "students" || type == "workers") && (<UserDetails user={student} type={type} />)}
        { type == "courses" && (<CourseDetails course={data} type={type} />)}
        { type == "enti" && (<EntiDetails ente={ente} type={type} />)}
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