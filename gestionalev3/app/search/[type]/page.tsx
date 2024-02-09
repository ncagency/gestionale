'use client'
import React, { useEffect, useState } from 'react'
import ViewButton from '@/components/ViewButton'
import { redirect } from 'next/dist/server/api-utils'

const Row = ({data, type} : {data:any, type:string}) => {

  let single = data
  let id = single._id.toString()
  return (
        <div className='d-flex justify-content-between align-items-center p-4 bg-primary rounded-3 shadow'>
          <div className='fs-4 text-white'>{single.nome} {single.secondo_nome} {single.cognome}</div>
          <ViewButton id={id} type={type} />
        </div>
  )
}

const Visualizer = ({data, type_s} : {data:any, type_s:string})  => {
  
  let mapping = data
  return (
    <div className='d-flex flex-column gap-2 p-3 border border-3 border-primary h-100 rounded-3'>
        {mapping.map((item:any, index:number) => (
            <Row key={index} data={item} type={type_s}/>
        ))} 
    </div>
  )
}

const Search = ({params}) => {

  let type:string = params.type

  const [data,setData] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
        try {
            // Esegui la query per ottenere tutti gli utenti dal database
            const response = await fetch(`http://127.0.0.1:2000/${type}`);
            const userData = await response.json();
            setData(userData);

            // Imposta l'indice attivo in base al tipo
            if (type === "students") {
                setActiveIndex(0);
            } else if (type === "courses" ) {
                setActiveIndex(1);
            } else if(type === "enti") {
                setActiveIndex(2);
            } else if (type === "workers") {
                setActiveIndex(3);
            }
        } catch (error) {
            console.error('Errore durante il recupero degli utenti dal database', error);
        }
    };

    fetchUsersData();
}, [type]); // Esegui l'effetto ogni volta che il valore di "type" cambia
   

      const tabs = [
        {text:"Students", path:"/search/students"},
        {text:"Corsi", path:"/search/courses"},
        {text:"Enti", path:"/search/enti"},
        {text:"Dipendenti", path:"/search/workers"}
      ]



      const styleTabs = 'bg-primary w-25 p-2 rounded-3 '
      const activeClass = 'bg-warning';

      const handleTabClick = (index, path) => {
        setActiveIndex(index);
        window.location.href = path;
      };
    

  return (
    <div className=' p-4 h-100'>
      <div className='w-100 h-100 flex-column'>
            <div className='d-flex justify-content-between  h-25 p-4'>
              <h1>Cerca</h1>
              <div className='w-50'>
                  <div className='d-flex gap-1 w-100 fs-5 text-white'> 

                  {tabs.map((item, index) => (
                       <div
                       key={index}
                       style={{ cursor: 'pointer' }}
                       className={`${styleTabs} ${activeIndex === index ? activeClass : ''}`}
                       onClick={() => handleTabClick(index, item.path)}
                        >
                      {item.text}</div>
                  ))}
                
                  </div>
                </div>
            </div>
            <div className=' h-75'>
                <Visualizer data={data} type_s={type}/>
            </div>
      </div>

    </div>
  )
}

export default Search