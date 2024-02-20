'use client'
import React,{useEffect, useState} from 'react'
import TableRow from '@/components/TableRow';
import axios from 'axios';
import { getWorkerIdFromCookie } from '@/components/Login';

const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"

const style = {
    background: "linear-gradient(to right, #3b83ff, #2a59ac)",
  }

const styleSuccess = {
    background: "linear-gradient(to right, #4ec932, #2bb50b)",
  }

const styleBad = {
    background: "linear-gradient(to right,#ce0c0c, #9a0000)",
}


interface Ente {
    nome: string;
    totale: number;
    da_inviare: number;
    inviati: number;
    da_ricevere:number;
}

interface Corso {
    name: string;
    costo: number;
    venduti: number;
    stock: number;
    totale_entrate: number;
    totale_uscite: number;
    totale_profit: number;
}
interface Student {
    _id: string;
    nome:string;
    secondo_nome:string;
    cognome:string;
    totale: number;
    saldati: number;
    in_sospeso: number;
}
interface CronologiaItem {
    costo?: number;
    inviati?: number;
    data:string;
}


function Contabile() {
    const [students,setStudents] = useState<Student[]>([]);
    const [courses,setCourses] = useState<Corso[]>([]);
    const [enti, setEnti] = useState<Ente[]>([]);
    const [cronologia, setCronologia] = useState<CronologiaItem[]>([]);
    const [permessi, setPermessi] = useState<any>()
    const [totalPerMonthYear, setTotalPerMonthYear] = useState<{[key: string]: {entrata: number, uscita: number, profitto: number}}>({})
    const [monthYearFilter, setMonthYearFilter] = useState<string>();

    useEffect(() => {
        const fetchFileNames = async () => {
            try {
                const response = await axios.get(`${apiURL}/contabile`);
                let contabile = response.data
                let worker_id = getWorkerIdFromCookie()
                const response2 = await axios.get(`${apiURL}/workers/${worker_id}`);
                setPermessi(response2.data.permessi)

                setStudents(contabile[0].students)
                setCourses(contabile[0].courses)
                setEnti(contabile[0].enti)
                setCronologia(contabile[0].cronologia_transazioni);
                
                // Calcolare totali per mese e anno
                const totals: {[key: string]: {entrata: number, uscita: number, profitto: number}} = {};
                cronologia.forEach(item => {
                    console.log(item)
                    const { data, costo, inviati } = item;
                    const [year, month] = data.split('-');
                    const key = `${year}-${month}`;
                    if (!totals[key]) {
                        totals[key] = { entrata: 0, uscita: 0, profitto: 0 };
                    }
                    if (costo !== undefined) {
                        totals[key].entrata += costo;
                    }
                    if (inviati !== undefined) {
                        totals[key].uscita += inviati;
                    }
                    totals[key].profitto = totals[key].entrata - totals[key].uscita;
                });
                setTotalPerMonthYear(totals);
            } catch (error) {
                console.error('Errore durante il recupero dei nomi dei file:', error);
            }
        };
    
        fetchFileNames();
    }, [cronologia]); // Aggiungi cronologia come dipendenza per eseguire l'effetto solo quando cambia la cronologia

    if (!permessi) {
        return "Loading..."
    } else if ( permessi.seeContabile != true) {
        return (
            <div className='h-100 d-flex justify-content-center align-items-center'>
                <h1>Non hai i permessi necessari per accedere a questa pagina</h1>
            </div>
        );
    }
    const redirec = (query:string) => {
        window.location.href = query;
    }
    return (
        <div className='h-100 d-flex flex-column gap-3'>
            <div className='text-primary fs-4'>
                <p onClick={() => redirec(`/`)} style={{cursor: 'pointer'}}>Indietro</p>
            </div>

            <div className='d-flex gap-1 h-25'>

                <div style={styleSuccess} className='d-flex flex-column justify-content-center bg-primary w-25 h-100 rounded-3 p-3'>
                  
                   <div className='d-flex gap-2 justify-content-between  p-1 '>
                
                    <p className='fs-4 text-white'>Entrate</p>

                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>


                    </div>
                   <p className='fs-1 text-white'>TOTALE €</p>
                </div>
                <div style={styleBad} className='d-flex flex-column justify-content-center  bg-primary w-25 h-100 rounded-3 p-3'>
                   
                <div className='d-flex gap-2 justify-content-between  p-1 '>
                
                <p className='fs-4 text-white'>Uscite</p>

                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>

                </div>
                   <p className='fs-1 text-white'>USCITE €</p>
                </div>
                <div style={style} className='d-flex flex-column justify-content-center  bg-primary w-25 h-100 rounded-3 p-3'>
                <div className='d-flex gap-2 justify-content-between  p-1 '>
                
                <p className='fs-4 text-white'>Profit</p>

                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
                </svg>
        
                <div>
                   <p className='fs-1 text-white'>PROFITTO €</p>
                </div>
                </div>
                
                </div> 
              
            </div>
            
            
            
<div style={style} className='w-100 d-flex flex-column p-4 rounded-4'> 
                    <h1 className='text-white fs-4'>Enti</h1>
                    <table className="table table-bordered ">
                            <tbody>
                                <tr className="border-1 p-4">
                                    <td>Nome</td>
                                    <td>Totale</td>
                                    <td>Da Inviare</td>
                                    <td>Inviati</td>
                                    <td>Da Ricevere</td>
                                </tr>

                        {enti.map((ente) => (
                                <tr className="border-1 p-4">
                                    <td>{ente.nome}</td>
                                    <td>{ente.totale} €</td>
                                    <td>{ente.da_inviare} €</td>
                                    <td>{ente.inviati} €</td>
                                    <td>{ente.da_ricevere} €</td>
                                </tr>                       
                        ))}
                        
                    </tbody>
                    </table>

</div>
<div style={style} className='w-100 d-flex flex-column p-4 rounded-4'> 
 <h1 className='text-white fs-4'>Corsi</h1>
                        <table className="table table-bordered">
                                <tbody>
                                    <tr className="border-1 p-4">
                                        <td>Nome</td>
                                        <td>Costo</td>
                                        <td>Venduti</td>
                                        <td>Stock</td>
                                        <td>Entrate</td>
                                        <td>Uscite</td>
                                        <td>Profit</td>
                                    </tr>

                            {courses.map((corso) => (
                                    <tr className="border-1 p-4">
                                        <td>{corso.name}</td>
                                        <td>{corso.costo} €</td>
                                        <td>{corso.venduti}</td>
                                        <td>{corso.stock}</td>
                                        <td>{corso.totale_entrate} €</td>
                                        <td>{corso.totale_uscite} €</td>
                                        <td>{corso.totale_profit} €</td>
                                    </tr>                       
                            ))}
                            
                        </tbody>
                        </table>
 </div>
<div style={style} className='w-100 p-4 rounded-4'>
            <h1 className='text-white'>Studenti</h1>
            <table className="table table-bordered">
                                <tbody>
                                    <tr className="border-1 p-4">
                                        <td>Nome</td>
                                        <td>Totale</td>
                                        <td>Saldati</td>
                                        <td>In Sospeso</td>
                                    </tr>

                            {students.map((student) => (
                                    <tr className="border-1 p-4">
                                        <td>{student.nome} {student.secondo_nome} {student.cognome}</td>
                                        <td>{student.totale} €</td>
                                        <td>{student.saldati} €</td>
                                        <td>{student.in_sospeso} €</td>
                                      
                                    </tr>                       
                            ))}
                            
                        </tbody>
            </table>
</div>
            </div>
  )
    
}


export default Contabile