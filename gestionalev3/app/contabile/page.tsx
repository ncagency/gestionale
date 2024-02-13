'use client'
import React,{useEffect, useState} from 'react'
import { TableRow } from '../scheda/[type]/[id]/page'
import axios from 'axios';


const Contabile = () => {
    const [students,setStudents] = useState([])
    const [courses,setCourses] = useState([])
    const [enti,setEnti] = useState([])
    const [cronologia,setCronologia] = useState([])




    useEffect(() => {
        const fetchFileNames = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:2000/contabile`);
            let contabile = response.data
            
            setStudents(contabile[0].students)
            setCourses(contabile[0].courses)
            setEnti(contabile[0].enti)
            setCronologia(contabile[0].cronologia_transazioni)
        
        } catch (error) {
            console.error('Errore durante il recupero dei nomi dei file:', error);
          }
        };
    
        fetchFileNames();
      });

   

    const calcolaTotale = () => {
                const totale = cronologia.reduce((acc, record) => acc + record.costo, 0);
                return totale;
    }

    const calcolaUscite = () => {
        const uscite = cronologia.reduce((acc, record) => acc + record.prezzo_acquisto, 0);
        return uscite;
}

    const total = calcolaTotale()
    const uscite = calcolaUscite()
    const profit = total - uscite




  return (
    <div className='h-100 d-flex flex-column gap-3'>
            <div className='text-primary fs-4'>
                <p>Indietro</p>

            </div>
            
            <div className='d-flex gap-1 h-25'>
                <div className='d-flex flex-column justify-content-center bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Totale</p>
                   <p className='fs-1 text-white'>{total}</p>
                </div>
                <div className='d-flex flex-column justify-content-center  bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Uscite</p>
                   <p className='fs-1 text-white'>{uscite}</p>
                </div>
                <div className='d-flex flex-column justify-content-center  bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Profit</p>
                   <p className='fs-1 text-white'>{profit}</p>
                </div>
            </div>


            <div className='d-flex gap-2 w-100 h-75 bg-primary p-4 rounded-4'  >
                    
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
                                    <td>{ente.totale}</td>
                                    <td>{ente.da_inviare}</td>
                                    <td>{ente.inviati}</td>
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
                                        <td>{corso.costo}</td>
                                        <td>{corso.venduti}</td>
                                        <td>{corso.stock}</td>
                                        <td>{corso.totale_entrate}</td>
                                        <td>{corso.totale_uscite}</td>
                                        <td>{corso.totale_profit}</td>
                                    </tr>                       
                            ))}
                            
                        </tbody>
                        </table>
                    </div>
                                
            </div>

            <div className='w-100 bg-primary p-4 rounded-4'>
            <h1 className='text-white'>Studenti</h1>
            <table className="table table-bordered">
                                <tbody>
                                    <tr className="border-1 p-4">
                                        <td>Nome</td>
                                        <td>Totale</td>
                                        <td>Saldati</td>
                                        <td>In Sospeso</td>
                                        <td>Iscrizioni</td>
                                    </tr>

                            {students.map((student) => (
                                    <tr className="border-1 p-4">
                                        <td>{student._id}</td>
                                        <td>{student.totale}</td>
                                        <td>{student.saldati}</td>
                                        <td>{student.in_sospeso}</td>
                                        <td>{student.rate.length}</td>
                                    </tr>                       
                            ))}
                            
                        </tbody>
                        </table>
            </div>
    </div>
  )
}

export default Contabile