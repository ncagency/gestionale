import Link from "next/link";
import GoButton from "./GoButton";
import React from "react";
import { useState, useEffect } from "react";
import { StudentView } from "./StudentViewScroll";
import axios from "axios";


const redirect = (query:string) => {
    const destinationValue = `/${query}`;
    window.location.href = destinationValue;
}

const Calendar = () => {
    return (
        <div className='bg-warning p-4 fs-1 d-flex flex-column h-100 justify-content-center align-items-center rounded-4'> {/* INSERISCI UNA FUNZIONE CHE AL CLICK REINDIRIZZI NELLA PAGINA DI ADD*/}


        </div>
    )
}

const CorsiCard = () => {
    let query = "search/courses";
    const handleRedirect = () => {
        redirect(query);
    }
    return (
        <div onClick={handleRedirect} style={{ cursor: 'pointer' }} className='bg-warning p-4 fs-1 d-flex flex-column h-100 justify-content-center align-items-center rounded-4'> {/* INSERISCI UNA FUNZIONE CHE AL CLICK REINDIRIZZI NELLA PAGINA DI ADD*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
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
        <div onClick={handleRedirect} style={{ cursor: 'pointer' }} className='bg-warning p-4 fs-1 d-flex flex-column h-100 justify-content-center align-items-center rounded-4' > {/* INSERISCI UNA FUNZIONE CHE AL CLICK REINDIRIZZI NELLA PAGINA DI ADD*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
        </svg>
      
      </div>
    );
};


const DipendentiCard: React.FC = () => {
    
    let query = "search/workers"
    return (
        <div className='d-flex flex-column h-100 position-relative bg-warning p-4  rounded-4'>
            <h1 className='mt-5 mb-5  text-success'>Dipendenti</h1>
            <GoButton destination={query} /> {/* INSERISCI DESTINAZIONE CORRETTA IN MODO DA GESTIRE L'EVENTO ONCLICK DEL BOTTONE PAGINA SEARCH per cercare dipendenti*/}
        </div>
    )
}


const AddCard = () => {
  let query = "manager"
  const handleRedirect = () => {
    redirect(query);
}
    return (
        <div onClick={handleRedirect} style={{ cursor: 'pointer' }}   className='bg-warning fs-1 d-flex flex-column h-100 justify-content-center align-items-center rounded-4'> {/* INSERISCI UNA FUNZIONE CHE AL CLICK REINDIRIZZI NELLA PAGINA DI ADD*/}
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
        </svg>
      
      </div>
    );
};

const ContabileCard: React.FC = () => {
    return (
      <div className='d-flex flex-column position-relative bg-warning p-4 h-100 rounded-4'>
        <h1 className='mt-5 mb-5 text-success'>Totale $</h1>
        <GoButton destination="Contabile" />{/* INSERISCI DESTINAZIONE CORRETTA IN MODO DA GESTIRE L'EVENTO ONCLICK DEL BOTTONE */}
      </div>
    );
  };


const StudentiCard: React.FC = () => {
    let query = "search/students"
    const [students, setStudents] = useState([]);

    const apiUrl = `http://localhost:2000/students`;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setStudents(response.data);
    
      } catch (error) {
        console.error('Errore durante la richiesta GET:', error);
      }
    };
  
    // Esegui la richiesta GET quando il componente si monta
    useEffect(() => {
      fetchData();
    }, []); // Assicurati di passare un array vuoto come secondo argomento per eseguire l'effetto solo al mount del componente

    return (
        <div className='d-flex flex-column position-relative bg-warning p-2 h-100 rounded-4 justify-content-between'>
        <h1 className=' text-success'>Studenti</h1>
        <div className=' mb-2 ' >
           <StudentView results={students}/>
        </div>
        <GoButton destination={query} />{/* INSERISCI DESTINAZIONE CORRETTA IN MODO DA GESTIRE L'EVENTO ONCLICK DEL BOTTONE */}
      </div>
    )
}


export default function Dashboard() {

   


    return (
        <div className='container '>
            <div className='row h-100 mt-4'>
                <div className='col-5'><ContabileCard /></div>
                <div className='col-2'><AddCard /></div>
                <div className='col'><DipendentiCard /></div>
            </div>
            <div className='row mt-4 h-100'>
                <div className='col-5'><StudentiCard /></div>
                <div className='col-2 flex-column h-100 '>
                    <div className='mb-3'><EntiCard /></div>
                    <div><CorsiCard /></div>
                </div>
                <div className='col'><Calendar /></div>
            </div>
        </div>
      )}