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
    nome:"ANSIDONNA",
    indirizzo:"Via delle Vie 12",
    citta:"Mondragone",
    prov:"CE",
    stato:"Italia",
    email:"ansidonna@gmail.com",
    cellulare:"082828282",
    altri_contatti:[
        {
            nome:"Cell",
            contatto:"+393662731459"
        },
        {
            nome:"Email",
            contatto:"+350393993"
        },
        {
            nome:"Email Franco",
            contatto:"+382829292"
        }
    ],
    payments:{
        da_saldare:1000,
        saldati:400,
        totale_dadare:1400,
        
    },
    fatture:[
        "path/to/photo","path/to/photo","path/to/photo","path/to/photo"
    ],
    corsi_id:[

    ]
}

const corso = {
    _id:"",
    nome:"EIPASS",
    ente:"ANSIDONNA",
    n_iscritti:0,
    utenti:[],
    payments:{
        entrate:1000,
        costi:300,
        stock:40
    }

}



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