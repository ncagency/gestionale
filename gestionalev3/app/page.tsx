'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { GoButton } from "@/components";
import { getWorkerIdFromCookie } from "@/components/Login";
const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"

const style = {
    background: "linear-gradient(to right, #3b83ff, #2a59ac)",
  }

const styleBox = {
    background: "linear-gradient(to right, #3b83ff, #2a59ac)",
    cursor: "pointer"
  }

const styleInviati = {
    background: "linear-gradient(to right, #a44b8b, #934c8a)",
}
  
const redirect = (query:string) => {
    const destinationValue = `/${query}`;
    window.location.href = destinationValue;
}



const CorsiCard = () => {
    let query = "search/courses";
    const handleRedirect = () => {
        redirect(query);
    }
    return (
        <div onClick={handleRedirect} style={styleBox} className='bg-primary p-4 fs-1 d-flex flex-column h-100 justify-content-center align-items-center rounded-4'> {/* INSERISCI UNA FUNZIONE CHE AL CLICK REINDIRIZZI NELLA PAGINA DI ADD*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="white" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                    <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
                    <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
            </svg>
      
      </div>
    );
};

  
const EntiCard = () => {
    let query = "search/enti";
    const handleRedirect = () => {
        redirect(query);
    }
    return (
        <div onClick={handleRedirect} style={styleBox} className='bg-primary p-4 fs-1 d-flex flex-column h-100 justify-content-center align-items-center rounded-4' > {/* INSERISCI UNA FUNZIONE CHE AL CLICK REINDIRIZZI NELLA PAGINA DI ADD*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="white" className="bi bi-building" viewBox="0 0 16 16">
                <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
        </svg>
      
      </div>
    );
};


const DipendentiCard: React.FC = () => {
    
    let query = "search"
    return (
        <div style={style} className='d-flex flex-column h-100 position-relative p-4  rounded-4'>
            <h1 className='mt-5 mb-5  text-white'>Cerca</h1>
            <GoButton destination={query} /> {/* INSERISCI DESTINAZIONE CORRETTA IN MODO DA GESTIRE L'EVENTO ONCLICK DEL BOTTONE PAGINA SEARCH per cercare dipendenti*/}
        </div>
    )
}


const AddCard = () => {
  let query = "aggiungi"
  const handleRedirect = () => {
    redirect(query);
}
    return (
        <div onClick={handleRedirect} style={styleBox} className=' fs-1 d-flex flex-column h-100 justify-content-center align-items-center rounded-4'> {/* INSERISCI UNA FUNZIONE CHE AL CLICK REINDIRIZZI NELLA PAGINA DI ADD*/}
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="white" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
        </svg>
      
      </div>
    );
};

const ContabileCard = () => {
 
    const [cronologia, setCronologia] = useState<CronologiaRecord[]>([]);

    useEffect(() => {
     const fetch = async () => {
         const response = await axios.get(`${apiURL}/get/s/cronologia`)
         setCronologia(response.data)
     }
     fetch()
    })
    
    let total = 0
    let uscite = 0
   
       
   cronologia.forEach(item => {
    if (item.hasOwnProperty("costo") && item.costo !== undefined) {
        total += item.costo;
    }
});

cronologia.forEach(item => {
    if (item.hasOwnProperty("inviati") && item.inviati !== undefined) {
        uscite += item.inviati;
    }
});

    return (
      <div style={style} className='d-flex flex-column position-relative p-4 h-100 rounded-4'>
        <div className="row w-100 h-75 p-1 m-2">
            <div className="col-6">
                <p className="fs-5 text-white">i</p>
                <p className="fs-1 text-white">{total} €</p>
            </div>   
            <div className="col-6">
                <p className="fs-5 text-white">i</p>
                <p className="fs-1 text-white">{uscite} €</p>
            </div>   
        </div>
        <GoButton destination="contabile" />
      </div>
    );
  };


  
interface CronologiaRecord {
    type: string; // o qualsiasi altro tipo appropriato
    utente_nome: string;
    course_nome: string;
    data: string;
    costo: number;
    ente_name: string;
    corso_nome: string;
    prezzo: number;
    n_stock: number;
    inviati: number;
  }


export default function Home() {
    const [cronologia, setCronologia] = useState<CronologiaRecord[]>([]);
    const [permessi,setPermessi] = useState<any>()
    const worker_id = getWorkerIdFromCookie()

   useEffect(() => {
    const fetch = async () => {
        const response = await axios.get(`${apiURL}/get/s/cronologia`)
        setCronologia(response.data)
        const response2 = await axios.get(`${apiURL}/workers/${worker_id}`);
        setPermessi(response2.data.permessi)

    }
    fetch()
   })
   

    if (!permessi) {
      return "..."
    }
 
   
 
   return (
        <div className='container '>
            <div className='row h-100 mt-4'>
                { permessi.seeContabile == true && (<div className='col-5'><ContabileCard /></div>)}
                <div className='col-2'><AddCard /></div>
                <div className='col'><DipendentiCard /></div>
            </div>
            <div className='row mt-4 h-100'>
          

                <div className='col-2 flex-column h-100 '>
                    <div className='mb-3'><EntiCard /></div>
                    <div><CorsiCard /></div>
                </div>
                { permessi.seeCronologia == true &&(<div className="col">
                <h1>Transazioni</h1>
                <div className=' border border-2 m-2 rounded-4' style={{ height: '255px', overflowY: 'auto', padding: '20px' }}>
                    {cronologia.map((record, index) => (
                       <div className="container">
                       {record.type === "ricev" && (
                           <div key={index} style={style} className="row d-flex gap-3 justify-content-between align-items-center p-4 text-white rounded-2 my-2">
                               <div className="col">
                                   <div>
                                       <label className="fs-5 text-warning">Nome</label>
                                       <p className="fs-3">{record.utente_nome}</p>
                                   </div>
                                   <div>
                                       <label className="fs-5 text-warning">Corso</label>
                                       <p className="fs-3">{record.course_nome}</p>
                                   </div>
                               </div>
                               <div className="col">
                                   <div className="row">
                                       <div className="col">
                                           <label className="fs-5 text-warning">Data</label>
                                           <p className="fs-4">{record.data}</p>
                                       </div>
                                       <div className="col">
                                           <label className="fs-5 text-warning">Tot</label>
                                           <p className="fs-4">{record.costo} €</p>
                                       </div>
                                       
                                   </div>
                                   <div className="row">
                                   <div className="col"><br/></div>
                                   <div className="col">
                                           <label className="fs-5 text-warning">Tipo</label>
                                           <p className="fs-4">Ricevuti</p>
                                       </div>
                               
                                    </div>
                               </div>
                           </div>
                       )}
                       {record.type === "inv" && (
                           <div key={index} style={styleInviati} className="row d-flex gap-3 justify-content-between align-items-center p-4 text-white fs-5 rounded-2 my-2">
                               <div className="col">
                                   <div>
                                       <label className="fs-5 text-warning">Nome</label>
                                       <p className="fs-3"> {record.ente_name}</p>
                                   </div>
                                   <div>
                                       <label className="fs-5 text-warning">Corso</label>
                                       <p className="fs-3">{record.corso_nome}</p>
                                   </div>
                               </div>
                               <div className="col">
                                   <div className="row">
                                       <div className="col">
                                       <label className="fs-5 text-warning">Data</label>
                                       <p className="fs-3"> {record.data}</p>
                                       </div>
                                       <div className="col">
                                       <label className="fs-5 text-warning">Stock</label>
                                       <p className="fs-3">{record.n_stock}</p>
                                       </div>
                                   </div>
                                   <div className="row">
                                       <div className="col">
                                       <label className="fs-5 text-warning">Prezzo</label>
                                       <p className="fs-3">{record.prezzo} €</p></div>
                                      
                                       <div className="col">
                                       <label className="fs-5 text-warning">Inviati</label>
                                       <p className="fs-3">{record.inviati} €</p>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       )}
                   </div>
                   
                      
                    ))}
                </div>
                </div>)}
                
            </div>
        </div>
      )}