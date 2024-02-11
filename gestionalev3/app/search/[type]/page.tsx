'use client'
import React, { useEffect, useState } from 'react'
import ViewButton from '@/components/ViewButton'
import { redirect } from 'next/dist/server/api-utils'
import axios from 'axios'

export const Row = ({data, type} : {data:any, type:string}) => {

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

const Search = ({ params }) => {
  let type: string = params.type;

  const [data, setData] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [birthYearRange, setBirthYearRange] = useState({ start: "", end: "" });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedEnte, setSelectedEnte] = useState("")






  

  const handleSearch = (array:any,type:string) => {
    let filteredData = []

    if (Array.isArray(array)) {
      filteredData = array.filter((data) => {
        
        
        //Cerca per Nome
        const fullName = `${data.nome} ${data.secondo_nome} ${data.cognome}`.toLowerCase() 
        const isNameMatch = fullName.includes(searchQuery.toLowerCase());

        //Cerca per Range anno
        const isBirthYearMatch =
          (!birthYearRange.start || parseInt(data.dob.split("-")[0]) >= parseInt(birthYearRange.start)) &&
          (!birthYearRange.end || parseInt(data.dob.split("-")[0]) <= parseInt(birthYearRange.end));

        //Cerca x Corso
        const isCourseMatch = !selectedCourse || data.corsi.includes(selectedCourse);

       
       
        const isEnteMatch = !selectedEnte || data.ente === selectedEnte;



        return isNameMatch && isBirthYearMatch && isCourseMatch && isEnteMatch 
      })
    } else {console.error("Errore")}







    return <Visualizer data={filteredData} type_s={type}/>
  }

 






  const [courses,setCourses] = useState<any[]>([]);
  const [enti,setEnti] = useState<any[]>([]);




//GET
  useEffect(() => {
    const fetchUsersData = async () => {
      try {

        const response = await fetch(`http://127.0.0.1:2000/${type}`);
        const dbData = await response.json();
        setData(dbData);


        
        if (type === "students") {
          const courses = await axios.get("http://127.0.0.1:2000/courses")
          const enti = await axios.get("http://127.0.0.1:2000/enti")
          setCourses(courses.data)
          setEnti(enti.data)
          setActiveIndex(0);

        } else if (type === "courses") {
          const enti = await axios.get("http://127.0.0.1:2000/enti")
          setEnti(enti.data)
          setActiveIndex(1);
        } else if (type === "enti") {
          const courses = await axios.get("http://127.0.0.1:2000/courses")
          setCourses(courses.data)

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

  //TABS LOGIC
  const tabs = [
    { text: "Students", path: "/search/students" },
    { text: "Corsi", path: "/search/courses" },
    { text: "Enti", path: "/search/enti" },
    { text: "Dipendenti", path: "/search/workers" }
  ];

  const styleTabs = 'bg-primary w-25 p-2 rounded-3 ';
  const activeClass = 'bg-warning';

  const handleTabClick = (index, path) => {
    setActiveIndex(index);
    window.location.href = path;
  };





  return (
    <div className='p-4 h-100'>
      <div className='w-100 h-100 flex-column'>
        <div className='d-flex justify-content-between h-25 p-4'>
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
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
            

        <input
          type="text"
          placeholder="Digita Nome..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        
        { type == "students" && <label>
                  Anno di nascita:
                  <input
                    type="text"
                    placeholder="Inizio"
                    value={birthYearRange.start}
                    onChange={(e) => setBirthYearRange({ ...birthYearRange, start: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Fine"
                    value={birthYearRange.end}
                    onChange={(e) => setBirthYearRange({ ...birthYearRange, end: e.target.value })}
                  />
                </label>
              }
                
        { type != "courses" && <label>
                  Corso:
                    <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                      <option value="">Tutti i corsi</option>
                      {courses.map((corso, index) => (
                        <option key={index} value={corso._id} >{corso.nome}</option>
                      ))}
                      </select>
                </label> }

        { type != "enti" && type != "students"   &&     <label>
                  Enti:
                    <select value={selectedEnte} onChange={(e) => setSelectedEnte(e.target.value)}>
                      <option value="">Tutti</option>
                      {enti.map((ente, index) => (
                        <option key={index} value={ente.nome} >{ente.nome}</option>
                      ))}
                      </select>
                </label> }
            

        </div>
        <div className='h-75'>
          {handleSearch(data, type)}
        </div>
      </div>
    </div>
  );
};

export default Search;