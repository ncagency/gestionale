'use client'
import React, { useEffect, useState } from 'react'




const Visualizer = (data) => {
  console.log(data.data)
  
  return (
    <>
    
    </>
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

      console.log(data)

  return (
    <div className=' p-4 h-100'>
      <div className='bg-primary w-100 h-100 flex-column'>
            <div className='bg-warning h-25'>
              x
            </div>
            <div className='bg-danger h-75'>
                <Visualizer data={data}/>
            </div>
      </div>

    </div>
  )
}

export default Search