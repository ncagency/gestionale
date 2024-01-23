'use client'

import { useState } from "react";

const VisualizeResult = (students:any) => {
  console.log(students)
  return (
    <div>

    </div>
  )
}

interface Student {
  _id: number;
  info: {
    nome: string;
    secondo_nome: string;
    cognome: string;
    dob: string; //data di nascita
    lob: string; //luogo di nascita
    prob: string; //provincia di nascita
    capb: number; // cap luogo nascita
    state: string; //stato di nascita
    cf: string; //codice fiscale
    res: string; //indirizzo residenza
    cap_res: number; //CAP RESIDENZA
    dom: string; //indirizzo domicilio
    cap_dom: number; // CAP DOMICILIO
    prefix_cell: string;
    cellulare: string;
    email: string;
  };
  payments: {
    totale: number;
    inviati: number;
    da_dare: number;
  };
  courses_id: number[];
  docs: {
    n_doc: string; //numero documento fornito (CID, PATENTE, PASSAPORTO)
    l_doc: string; //luogo rilascio documento fornito (COMUNE, MOTORIZZAZIONE)
    city_doc: string; //CITTA DI RILASCIO documento fornito
    rilascio_doc: string; //data rilascio
    scadenza_doc: string; //data scadenza
    immagini: {
      path: string; //cartella studente
      fronte: string;
      retro: string;
      vari_doc: { path: string }[];
    };
  };
}

const students = [
  {
          _id:38199209,
          info:{
              nome:"Luca", 
              secondo_nome:"Jr", 
              cognome:"Valori",
              dob:"25-05-2001", //data di nascita
              lob:"Benevento", //luogo di nascita
              prob:"BN", //provincia di nascita
              capb:82100, // cap luogo nascita
              state:"Italy", //stato di nascita
              cf:"LVHS01MSHWU12", //codice fiscale
              res:"Via Avellino 28", //indirizzo residenza
              cap_res:82100, //CAP RESIDENZA
              dom:"Via Avellino 28", //indirizzo domicilio
              cap_dom:82100, // CAP DOMICILIO
              prefix_cell:"+39",
              cellulare:"3662731403",
              email:"gerardo.dagostino12@gmail.com",

          },
          payments:{
              totale:3500,
              inviati:2000,
              da_dare:0,
          },
          courses_id:[
              77764555
          ],
          docs:{
              n_doc:"CA1177899", //numero documento fornito (CID, PATENTE, PASSAPORTO)
              l_doc:"COMUNE", //luogo rilascio documento fornito (COMUNE, MOTORIZZAZIONE)
              city_doc:"Benevento", //CITTA DI RILASCIO documento fornito
              rilascio_doc:"22-01-2023", //data rilascio
              scadenza_doc:"25-05-2033", //data scadenza
              immagini:{
                  path:"", //cartella studente
                  fronte:"",
                  retro:"",
                  vari_doc:[
                      {path:""}
                  ]
              }

      }
  }
] 


export default function Search() {
    // Stato per gestire la barra di ricerca
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Stato per gestire i filtri
  const [filters, setFilters] = useState<{ someFilter: string }>({
    someFilter: '',
  });

  // Funzione per gestire la barra di ricerca
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  // Funzione per gestire i filtri
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };


  // Logica di filtraggio degli studenti
  const filteredStudents: Student[] = students.filter((student) => {
    // Aggiungi qui la logica di filtraggio in base a searchQuery e filters
    // Esempio: filtra per nome
    return student.info.nome.toLowerCase().includes(searchQuery.toLowerCase());
  });

    return (
       <div className="container">
        <div className="row text-center">
          <h1 className="fs-1">Search Tool</h1>
        </div>
        <div id="searchinput" className="row">
        {/* Barra di ricerca */}
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearch}
              />

              {/* Filtri (aggiungi altri filtri secondo necessità) */}
        <select
          value={filters.someFilter}
          onChange={(e) => handleFilterChange('someFilter', e.target.value)}
        >
          <option value="">All</option>
          <option value="someValue">Some Value</option>
          {/* Aggiungi altre opzioni di filtro */}
        </select>

        </div>
        <div className="row">
          <VisualizeResult students={filteredStudents} />
        </div>
       </div>
      )}