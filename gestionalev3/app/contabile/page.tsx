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
            
            {Object.entries(totalPerMonthYear).map(([monthYear, totals]) => (
                <div key={monthYear}>
                    <h2>{monthYear}</h2>
                    <p>Entrate: {totals.entrata} €</p>
                    <p>Uscite: {totals.uscita} €</p>
                    <p>Profitto: {totals.profitto} €</p>
                </div>
            ))}
        </div>
    );
}


export default Contabile