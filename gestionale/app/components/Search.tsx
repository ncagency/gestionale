'use client'
import { useRouter } from 'next/router';
import { useState } from "react";
 
const EntiRow = ({ ente }: { ente: Enti }) => {
  return (
    <div className="bg-success text-warning p-4 rounded-3 row my-2">
      <div className="col-6">
      <h1 className="fs-4">{ente.nome}</h1>
      </div>
      <div className="col-4">
      <p className=" fs-5 ml-5 bold"></p>
      </div>
      <div className="col-2 d-flex gap-2">
        <p>Visualizza</p>
        <p>Edit</p>
        <p></p>
      </div>
    </div>
  );
};

const CourseRow = ({ course }: { course: Courses }) => {
  return (
    <div className="bg-success text-warning p-4 rounded-3 row my-2">
      <div className="col-6">
      <h1 className="fs-4">{course.nome}</h1>
      </div>
      <div className="col-4">
      <p className=" fs-5 ml-5 bold"></p>
      </div>
      <div className="col-2 d-flex gap-2">
        <p>Visualizza</p>
        <p>Edit</p>
        <p></p>
      </div>
    </div>
  );
};
const UserRow = ({ user }: { user: User }) => {
  return (
    <div className="bg-success text-warning p-4 rounded-3 row my-2">
      <div className="col-6">
      <h1 className="fs-4">{user.info.nome} {user.info.secondo_nome} {user.info.cognome}</h1>
      </div>
      <div className="col-4">
      <p className=" fs-5 ml-5 bold">{user.info.dob}</p>
      </div>
      <div className="col-2 d-flex gap-2">
        <p>Visualizza</p>
        <p>Edit</p>
        <p></p>
      </div>
    </div>
  );
};

const VisualizeResult = ({ results, dataType }: { results: User[] | Courses[] | Enti[], dataType: string }) => {
  
    return (
      <div className="p-2 w-100 vh-100 mt-4 rounded-2 border border-5 border-warning overflow-auto">
              {results.map((item: User | Courses | Enti, index: number) => (
                 <div key={index}>
                    {(dataType == "students" || dataType == "workers") && (
                      <>
                      <UserRow user={item as User} />
                      </>
                    )} 
                    {(dataType == "courses") && (
                      <>
                      <CourseRow course={item as Courses} />
                      </>
                    )} 
                    {(dataType == "enti") && (
                      <>
                      <EntiRow ente={item as Enti} />
                      </>
                    )}
                 </div>
              ))}
      </div>
    ) 
 
};


const province = [
  "","AG", "AL", "AN", "AO", "AR", "AP", "AT", "AV", "BA", "BT", "BL", "BN", "BG", "BI", "BO", "BZ", "BS", "BR", "CA", "CL",
  "CB", "CI", "CE", "CT", "CZ", "CH", "CO", "CS", "CR", "KR", "CN", "EN", "FM", "FE", "FI", "FG", "FC", "FR", "GE", "GO",
  "GR", "IM", "IS", "AQ", "SP", "LT", "LE", "LC", "LI", "LO", "LU", "MC", "MN", "MS", "MT", "VS", "ME", "MI", "MO", "MB",
  "NA", "NO", "NU", "OG", "OT", "OR", "PD", "PA", "PR", "PV", "PG", "PU", "PE", "PC", "PI", "PT", "PN", "PZ", "PO", "RG",
  "RA", "RE", "RI", "RN", "RM", "RO", "SA", "VS", "SS", "SV", "SI", "SR", "SO", "TA", "TE", "TR", "TO", "OG", "TP", "TN",
  "TV", "TS", "UD", "VA", "VE", "VB", "VC", "VR", "VV", "VI", "VT"
];

//importa corsi
let corsi = [
  {
      _id:77764555,
      nome:"EIPASS",
      ente:"ANSIDONNA",
      payments:{
          prezzo_acquisto:20,
          prezzo_vendita:140,
          entrate:0,
          uscite:0,
          profitto:0,
      },
      numero_utenti:0,
      id_utenti:[
          38199209
      ],
  },
  {
      _id:29388899,
      nome:"B1 INGLESE",
      ente:"ansi",
      payments:{
          prezzo_acquisto:100,
          prezzo_vendita:180,
          entrate:0,
          uscite:0,
          profitto:0,
      },
      numero_utenti:0,
      id_utenti:[
          38199209
      ],
  },
  {
    _id:29348899,
    nome:"PEKIT EXPERT",
    ente:"ANSIDONNA",
    payments:{
        prezzo_acquisto:130,
        prezzo_vendita:180,
        entrate:0,
        uscite:0,
        profitto:0,
    },
    numero_utenti:0,
    id_utenti:[
    ],
}
  ]


export default interface User {
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
export interface Courses {
    _id: number;
    nome: string;
    ente: string;
    payments: {
      prezzo_acquisto: number;
      prezzo_vendita: number;
      entrate: number;
      uscite: number;
      profitto: number;
    };
    numero_utenti: number;
    id_utenti: number[];
  }
interface Enti {
  _id:number,
  nome:string,
  prob:string,
  payments:{
      da_dare:number,
      da_ricevere:number
  },

}
interface SearchParams {
    searchQuery: string;
    birthYearRange: { start?: string; end?: string };
    selectedCourse: string;
    selectedProvince: string;
    userRange: { start?: string; end?: string };
    priceRange: { start?: string; end?: string };
  }
interface SearchProps {
    datas: User[];
    type: string;
  }
  

  
export const Search: React.FC<SearchProps> = ({ datas, type }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [birthYearRange, setBirthYearRange] = useState({ start: "", end: "" });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [userRange, setUserRange] = useState({ start: "", end: "" });
  const [priceRange, setPriceRange] = useState({ start: "", end: "" });
  
  console.log(datas)
  const handleSearch = (array: User[] | Courses[] | Enti[], dataType: string) => {
    let filteredData: (User | Courses)[] = [];
    
    if (Array.isArray(array)) {
      filteredData = array.filter((data: User | Courses | Enti): data is User => {
        if ('info' in data) {
          // È un utente
          const user = data as User;
          // Implementa la logica di filtraggio per gli utenti
          const fullName = `${user.info.nome} ${user.info.secondo_nome} ${user.info.cognome}`.toLowerCase();
          const isNameMatch = fullName.includes(searchQuery.toLowerCase());
          const isBirthYearMatch =
            (!birthYearRange.start || parseInt(user.info.dob.split("-")[2]) >= parseInt(birthYearRange.start)) &&
            (!birthYearRange.end || parseInt(user.info.dob.split("-")[2]) <= parseInt(birthYearRange.end));
          const isCourseMatch = !selectedCourse || user.courses_id.includes(parseInt(selectedCourse, 10));
          const isProvinceMatch = !selectedProvince || user.info.prob.toLowerCase() === selectedProvince.toLowerCase();
      
          return isNameMatch && isBirthYearMatch && isCourseMatch && isProvinceMatch;
        } else if (dataType == "courses") {
          // È un corso
          const course = data as Courses;
          // Implementa la logica di filtraggio per i corsi
          const isNameMatch = course.nome.toLowerCase().includes(searchQuery.toLowerCase());
          const isUserRangeMatch =
            (!userRange.start || course.numero_utenti >= parseInt(userRange.start, 10)) &&
            (!userRange.end || course.numero_utenti <= parseInt(userRange.end, 10));
          const isPriceRangeMatch =
            (!priceRange.start || course.payments.prezzo_acquisto >= parseInt(priceRange.start, 10)) &&
            (!priceRange.end || course.payments.prezzo_acquisto <= parseInt(priceRange.end, 10));
      
          return isNameMatch && isUserRangeMatch && isPriceRangeMatch;
        } else if (dataType == "enti") {
          const ente = data as Enti
          const isNameMatch = ente.nome.toLowerCase().includes(searchQuery.toLowerCase());
          const isCourseMatch = !selectedCourse || selectedCourse === ente.nome;
          const isProvinceMatch = !selectedProvince || ente.prob.toLowerCase() === selectedProvince.toLowerCase();
          
          return isNameMatch && isCourseMatch && isProvinceMatch
        }
      });
      
    } else {
      console.error('La variabile "datas" non è un array.');
    }
    
    // Passa gli studenti filtrati al componente VisualizeResult per il rendering
    return <VisualizeResult results={filteredData} dataType={dataType}/>;
  };

  
  return (
        <div className="container">
      
      {(type == "students" || type== "workers") && (<>
      <div id="searchinputuser" className="row">
        <input
          type="text"
          placeholder="Cerca per Nome o Cognome"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <label>
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
        <label>
          Provincia:
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            {province.map((prov, index) => (
              <option key={index} value={prov}>{prov}</option>
            ))}
          </select>
        </label>
        
        { (type === "students" ) && (
          <>
          <label>
          Corso:
            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">Tutti i corsi</option>
              {corsi.map((corso, index) => (
                <option key={index} value={corso._id} >{corso.nome}</option>
              ))}
              
              {/* Aggiungi altre opzioni secondo le esigenze */}
            </select>
        </label>
          </>)} 
        <button onClick={handleSearch}>Cerca</button>
      </div> 
      </>)}
      {(type == "courses") && (
        <>
          <div id="searchinputcourses" className='row'>
        <input
          type="text"
          placeholder="Cerca per Nome"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <label>
          Prezzo:
          <input
            type="text"
            placeholder="Minimo"
            value={priceRange.start}
            onChange={(e) => setPriceRange({ ...priceRange, start: e.target.value })}
          />
          <input
            type="text"
            placeholder="Massimo"
            value={priceRange.end}
            onChange={(e) => setPriceRange({ ...priceRange, end: e.target.value })}
          />
        </label>

        <label>
          Numero utenti:
          <input
            type="text"
            placeholder="Da"
            value={userRange.start}
            onChange={(e) => setUserRange({ ...userRange, start: e.target.value })}
          />
          <input
            type="text"
            placeholder="A"
            value={userRange.end}
            onChange={(e) => setUserRange({ ...userRange, end: e.target.value })}
          />
        </label>
        <button onClick={handleSearch}>Cerca</button>
          </div>
         
        </>
      )}

      {(type == "enti") && (
        <>
          <div id="searchinputenti" className='row'>
        <input
          type="text"
          placeholder="Cerca per Nome"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <label>
          Provincia:
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            {province.map((prov, index) => (
              <option key={index} value={prov}>{prov}</option>
            ))}
          </select>
        </label>


        <label>
          Corso:
            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">Tutti i corsi</option>
              {corsi.map((corso, index) => (
                <option key={index} value={corso.ente} >{corso.nome}</option>
              ))}
              
              {/* Aggiungi altre opzioni secondo le esigenze */}
            </select>
        </label>


        <button onClick={handleSearch}>Cerca</button>
          </div>
         
        </>
      )}
       

      <div className="row flex-grow-1 p-4">
        {handleSearch(datas, type)} 
      </div>
    </div>
  );
}