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

          
           

          {monthYearFilter && (
            <div key={monthYearFilter}>
                <h2>{monthYearFilter}</h2>
                <p>Entrate: {totalPerMonthYear[monthYearFilter].entrata} €</p>
                <p>Uscite: {totalPerMonthYear[monthYearFilter].uscita} €</p>
                <p>Profitto: {totalPerMonthYear[monthYearFilter].profitto} €</p>
            </div>
            )}
        <div>
        <select onChange={(e) => setMonthYearFilter(e.target.value)}>
            {Object.keys(totalPerMonthYear).map((monthYear) => (
                <option key={monthYear} value={monthYear}>
                {monthYear}
                </option>
            ))}
            </select>

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