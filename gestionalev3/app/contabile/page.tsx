'use client'
import React,{useEffect, useState} from 'react'
import { TableRow } from '../scheda/[type]/[id]/page'
import axios from 'axios';


const Contabile = () => {
    const [contabile,setContabile] = useState([])

    useEffect(() => {
        const fetchFileNames = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:2000/contabile`);
            setContabile(response.data)
          } catch (error) {
            console.error('Errore durante il recupero dei nomi dei file:', error);
          }
        };
    
        fetchFileNames();
      });
      console.log(contabile[0])

  return (
    <div className='h-100 d-flex flex-column gap-3'>
            <div className='text-primary fs-4'>
                <p>Indietro</p>

            </div>
            
            <div className='d-flex gap-1 h-25'>
                <div className='d-flex flex-column justify-content-center bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Totale</p>
                   <p className='fs-1 text-white'>10.0000</p>
                </div>
                <div className='d-flex flex-column justify-content-center  bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Entrate</p>
                   <p className='fs-1 text-white'>10.0000</p>
                </div>
                <div className='d-flex flex-column justify-content-center  bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Uscite</p>
                   <p className='fs-1 text-white'>10.0000</p>
                </div>
                <div className='d-flex flex-column justify-content-center  bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Profit</p>
                   <p className='fs-1 text-white'>10.0000</p>
                </div>
            </div>


            <div className='d-flex gap-2 w-100 h-75 bg-primary p-4'  >

                    <div className='w-50 d-flex '> 
                    <table className="table table-bordered">
                        <tbody>

                            <TableRow label="ID" value="we" />
                          
                        </tbody>
                    </table>
                    </div>
                    <div className='w-50 d-flex '> 
                    <table className="table table-bordered">
                        <tbody>
                            
                            <TableRow label="ID" value="we" />
                          
                        </tbody>
                    </table>
                    </div>
                   
            </div>
    </div>
  )
}

export default Contabile