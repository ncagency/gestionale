'use client'
import React, { useEffect, useState } from 'react'


const Row = (data) => {
  
  let single = data.data
  return (
        <div className='d-flex justify-content-between p-4'>
          <p>{single.nome} {single.secondo_nome} {single.cognome}</p>
          <div>View</div>
        </div>
  )
}

const Visualizer = (data) => {
  
  let mapping = data.data
  
  return (
    <div>
        {mapping.map((item:any, index:number) => (
            <Row key={index} data={item}/>
        ))} 
    </div>
  )
}

const Search = ({params}) => {


  const [data,setData] = useState<any[]>([]);

  useEffect(() => {
          const fetchUsersData = async () => {
              try {
                  // Esegui la query per ottenere tutti gli utenti dal database
                  const response = await fetch('http://127.0.0.1:2000/students');
                  const userData = await response.json();
                  setData(userData);
              } catch (error) {
                  console.error('Errore durante il recupero degli utenti dal database', error);
              }
          };
  
          fetchUsersData();
      }, []);


  return (
    <div className=' p-4 h-100'>
      <div className='w-100 h-100 flex-column'>
            <div className='bg-warning h-25'>
              x
            </div>
            <div className=' h-75'>
                <Visualizer data={data}/>
            </div>
      </div>

    </div>
  )
}

export default Search