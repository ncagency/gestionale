'use client'
import React,{useEffect, useState} from 'react'
import TableRow from '@/components/TableRow';
import axios from 'axios';
import { getWorkerId } from "@/components/Login";


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

interface CronologiaItem {
    costo?: number;
    inviati?: number;
}

interface Ente {
    nome: string;
    totale: number;
    da_inviare: number;
    inviati: number;
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
    totale: number;
    saldati: number;
    in_sospeso: number;
}


const Contabile = () => {
    const [students,setStudents] = useState<Student[]>([]);
    const [courses,setCourses] = useState<Corso[]>([]);
    const [enti, setEnti] = useState<Ente[]>([]);
    const [cronologia, setCronologia] = useState<CronologiaItem[]>([]);
    const [permessi,setPermessi] = useState<any>()
    const worker_id = getWorkerId()


    useEffect(() => {
        const fetchFileNames = async () => {
          try {
            console.log(worker_id)
            const response = await axios.get(`${apiURL}/contabile`);
            let contabile = response.data
            const response2 = await axios.get(`${apiURL}/workers/${worker_id}`);
            setPermessi(response2.data.permessi)
            setStudents(contabile[0].students)
            setCourses(contabile[0].courses)
            setEnti(contabile[0].enti)
            setCronologia(contabile[0].cronologia_transazioni)
        
        } catch (error) {
            console.error('Errore durante il recupero dei nomi dei file:', error);
          }
        };
    
        fetchFileNames();
      }, [worker_id]);

   

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
 
  
    
    const profit = total - uscite
    const redirec = (query:string) => {
        window.location.href = query;
    }

    if (!permessi || !permessi.seeContabile) {
        return "Caricamento...";
      }

  return (
    <div className='h-100 d-flex flex-column gap-3'>
            
            <div className='text-primary fs-4'>
                <p onClick={() => redirec(`/`)} style={{cursor: 'pointer'}}>Indietro</p>
            </div>
            
            <div className='d-flex gap-1 h-25'>
                <div style={styleSuccess} className='d-flex flex-column justify-content-center bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Entrate</p>
                   <p className='fs-1 text-white'>{total} €</p>
                </div>
                <div style={styleBad} className='d-flex flex-column justify-content-center  bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Uscite</p>
                   <p className='fs-1 text-white'>{uscite} €</p>
                </div>
                <div style={style} className='d-flex flex-column justify-content-center  bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Profit</p>
                   <p className='fs-1 text-white'>{profit} €</p>
                </div>
            </div>


            <div  style={style} className='d-flex gap-2 w-100 h-75 p-4 rounded-4'  >
                    
                    <div className='w-50 d-flex flex-column '> 
                    <h1 className='text-white fs-4'>Enti</h1>
                    <table className="table table-bordered ">
                            <tbody>
                                <tr className="border-1 p-4">
                                    <td>Nome</td>
                                    <td>Totale</td>
                                    <td>Da Inviare</td>
                                    <td>Inviati</td>
                                </tr>

                        {enti.map((ente) => (
                                <tr className="border-1 p-4">
                                    <td>{ente.nome}</td>
                                    <td>{ente.totale} €</td>
                                    <td>{ente.da_inviare} €</td>
                                    <td>{ente.inviati} €</td>
                                </tr>                       
                        ))}
                        
                    </tbody>
                    </table>

                    </div>
                    <div className='w-50 d-flex flex-column'> 
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
                                        <td>{student._id}</td>
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