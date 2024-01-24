'use client'

import { useState } from "react";

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

const UserRow = ({ student }: { student: Student }) => {
  return (
    <div className="bg-success text-warning p-4 rounded-3 row my-2">
      <div className="col-6">
      <h1 className="fs-4">{student.info.nome} {student.info.secondo_nome} {student.info.cognome}</h1>
      </div>
      <div className="col-4">
      <p className=" fs-5 ml-5 bold">{student.info.dob}</p>
      </div>
      <div className="col-2 d-flex gap-2">
        <p>Visualizza</p>
        <p>Edit</p>
        <p></p>
      </div>
    </div>
  );
};

const VisualizeResult = ({ results }: { results: Student[] }) => {
  return (
    <div className="p-2 w-100 vh-100 mt-4 rounded-2 border border-5 border-warning overflow-auto">
      {results.map((item: Student, index: number) => (
        <UserRow key={index} student={item} />
      ))}
    </div>
  );
};


const province = [
  "AG", "AL", "AN", "AO", "AR", "AP", "AT", "AV", "BA", "BT", "BL", "BN", "BG", "BI", "BO", "BZ", "BS", "BR", "CA", "CL",
  "CB", "CI", "CE", "CT", "CZ", "CH", "CO", "CS", "CR", "KR", "CN", "EN", "FM", "FE", "FI", "FG", "FC", "FR", "GE", "GO",
  "GR", "IM", "IS", "AQ", "SP", "LT", "LE", "LC", "LI", "LO", "LU", "MC", "MN", "MS", "MT", "VS", "ME", "MI", "MO", "MB",
  "NA", "NO", "NU", "OG", "OT", "OR", "PD", "PA", "PR", "PV", "PG", "PU", "PE", "PC", "PI", "PT", "PN", "PZ", "PO", "RG",
  "RA", "RE", "RI", "RN", "RM", "RO", "SA", "VS", "SS", "SV", "SI", "SR", "SO", "TA", "TE", "TR", "TO", "OG", "TP", "TN",
  "TV", "TS", "UD", "VA", "VE", "VB", "VC", "VR", "VV", "VI", "VT"
];

const students = [
  {
    _id: 38199209,
    info: {
      nome: "Luca",
      secondo_nome: "Jr",
      cognome: "Valori",
      dob: "25-05-2001",
      lob: "Benevento",
      prob: "BN",
      capb: 82100,
      state: "Italy",
      cf: "LVHS01MSHWU12",
      res: "Via Avellino 28",
      cap_res: 82100,
      dom: "Via Avellino 28",
      cap_dom: 82100,
      prefix_cell: "+39",
      cellulare: "3662731403",
      email: "gerardo.dagostino12@gmail.com",
    },
    payments: {
      totale: 3500,
      inviati: 2000,
      da_dare: 0,
    },
    courses_id: [77764555, 29388899],
    docs: {
      n_doc: "CA1177899",
      l_doc: "COMUNE",
      city_doc: "Benevento",
      rilascio_doc: "22-01-2023",
      scadenza_doc: "25-05-2033",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38199210,
    info: {
      nome: "Big",
      cognome: "Luca",
      dob: "25-05-1998",
      lob: "Benevento",
      prob: "BN",
      capb: 82100,
      state: "Italy",
      cf: "LVHS01MSHWU12",
      res: "Via Avellino 28",
      cap_res: 82100,
      dom: "Via Avellino 28",
      cap_dom: 82100,
      prefix_cell: "+39",
      cellulare: "3662731403",
      email: "gerardo.dagostino12@gmail.com",
    },
    payments: {
      totale: 3500,
      inviati: 2000,
      da_dare: 0,
    },
    courses_id: [29348899],
    docs: {
      n_doc: "CA1177899",
      l_doc: "COMUNE",
      city_doc: "Benevento",
      rilascio_doc: "22-01-2023",
      scadenza_doc: "25-05-2033",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38200987,
    info: {
      nome: "Giovanni",
      secondo_nome: "Antonio",
      cognome: "Ferrari",
      dob: "10-12-1995",
      lob: "Milano",
      prob: "MI",
      capb: 20100,
      state: "Italy",
      cf: "GFHS01GNRAO95",
      res: "Via Torino 55",
      cap_res: 20100,
      dom: "Via Milano 30",
      cap_dom: 20100,
      prefix_cell: "+39",
      cellulare: "3339876543",
      email: "giovanni.ferrari@example.com",
    },
    payments: {
      totale: 3000,
      inviati: 1500,
      da_dare: 1500,
    },
    courses_id: [99998888],
    docs: {
      n_doc: "PA123456",
      l_doc: "COMUNE",
      city_doc: "Milano",
      rilascio_doc: "05-06-2018",
      scadenza_doc: "10-12-2028",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38201234,
    info: {
      nome: "Anna",
      secondo_nome: "Maria",
      cognome: "Rossi",
      dob: "15-08-1997",
      lob: "Napoli",
      prob: "NA",
      capb: 80100,
      state: "Italy",
      cf: "RSSNMA97M41H501I",
      res: "Via Vesuvio 10",
      cap_res: 80100,
      dom: "Via Napoli 5",
      cap_dom: 80100,
      prefix_cell: "+39",
      cellulare: "3456789012",
      email: "anna.rossi@example.com",
    },
    payments: {
      totale: 2800,
      inviati: 1800,
      da_dare: 1000,
    },
    courses_id: [77764555, 88887777],
    docs: {
      n_doc: "ID876543",
      l_doc: "COMUNE",
      city_doc: "Napoli",
      rilascio_doc: "10-04-2016",
      scadenza_doc: "15-08-2026",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38203456,
    info: {
      nome: "Francesco",
      secondo_nome: "Giuseppe",
      cognome: "Bianchi",
      dob: "02-03-1994",
      lob: "Roma",
      prob: "RM",
      capb: 10100,
      state: "Italy",
      cf: "BNCFRZ94H02H501C",
      res: "Via Roma 15",
      cap_res: 10100,
      dom: "Via Napoli 8",
      cap_dom: 10100,
      prefix_cell: "+39",
      cellulare: "3337654321",
      email: "francesco.bianchi@example.com",
    },
    payments: {
      totale: 3200,
      inviati: 2000,
      da_dare: 1200,
    },
    courses_id: [77764555],
    docs: {
      n_doc: "DL345678",
      l_doc: "COMUNE",
      city_doc: "Roma",
      rilascio_doc: "18-09-2013",
      scadenza_doc: "02-03-2023",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38204567,
    info: {
      nome: "Elena",
      secondo_nome: "Maria",
      cognome: "De Luca",
      dob: "12-07-2002",
      lob: "Palermo",
      prob: "PA",
      capb: 90100,
      state: "Italy",
      cf: "DLNMRE02L12H501F",
      res: "Via Palermo 22",
      cap_res: 90100,
      dom: "Via Messina 14",
      cap_dom: 90100,
      prefix_cell: "+39",
      cellulare: "3498765432",
      email: "elena.deluca@example.com",
    },
    payments: {
      totale: 2800,
      inviati: 1600,
      da_dare: 1200,
    },
    courses_id: [99998888, 29388899],
    docs: {
      n_doc: "ID543210",
      l_doc: "COMUNE",
      city_doc: "Palermo",
      rilascio_doc: "05-11-2019",
      scadenza_doc: "12-07-2029",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38205678,
    info: {
      nome: "Marco",
      secondo_nome: "Antonio",
      cognome: "Galli",
      dob: "08-04-1998",
      lob: "Milano",
      prob: "MI",
      capb: 20100,
      state: "Italy",
      cf: "MRCANT98D08H501K",
      res: "Via Milano 18",
      cap_res: 20100,
      dom: "Via Torino 7",
      cap_dom: 20100,
      prefix_cell: "+39",
      cellulare: "3331234567",
      email: "marco.galli@example.com",
    },
    payments: {
      totale: 3400,
      inviati: 2200,
      da_dare: 1200,
    },
    courses_id: [77764555, 88887777],
    docs: {
      n_doc: "DL987654",
      l_doc: "MOTORIZZAZIONE",
      city_doc: "Milano",
      rilascio_doc: "15-09-2016",
      scadenza_doc: "08-04-2026",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38203456,
    info: {
      nome: "Francesco",
      secondo_nome: "Giuseppe",
      cognome: "Bianchi",
      dob: "02-03-1994",
      lob: "Roma",
      prob: "RM",
      capb: 10100,
      state: "Italy",
      cf: "BNCFRZ94H02H501C",
      res: "Via Roma 15",
      cap_res: 10100,
      dom: "Via Napoli 8",
      cap_dom: 10100,
      prefix_cell: "+39",
      cellulare: "3337654321",
      email: "francesco.bianchi@example.com",
    },
    payments: {
      totale: 3200,
      inviati: 2000,
      da_dare: 1200,
    },
    courses_id: [77764555],
    docs: {
      n_doc: "DL345678",
      l_doc: "COMUNE",
      city_doc: "Roma",
      rilascio_doc: "18-09-2013",
      scadenza_doc: "02-03-2023",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38204567,
    info: {
      nome: "Elena",
      secondo_nome: "Maria",
      cognome: "De Luca",
      dob: "12-07-2002",
      lob: "Palermo",
      prob: "PA",
      capb: 90100,
      state: "Italy",
      cf: "DLNMRE02L12H501F",
      res: "Via Palermo 22",
      cap_res: 90100,
      dom: "Via Messina 14",
      cap_dom: 90100,
      prefix_cell: "+39",
      cellulare: "3498765432",
      email: "elena.deluca@example.com",
    },
    payments: {
      totale: 2800,
      inviati: 1600,
      da_dare: 1200,
    },
    courses_id: [99998888, 29388899],
    docs: {
      n_doc: "ID543210",
      l_doc: "COMUNE",
      city_doc: "Palermo",
      rilascio_doc: "05-11-2019",
      scadenza_doc: "12-07-2029",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38205678,
    info: {
      nome: "Marco",
      secondo_nome: "Antonio",
      cognome: "Galli",
      dob: "08-04-1998",
      lob: "Milano",
      prob: "MI",
      capb: 20100,
      state: "Italy",
      cf: "MRCANT98D08H501K",
      res: "Via Milano 18",
      cap_res: 20100,
      dom: "Via Torino 7",
      cap_dom: 20100,
      prefix_cell: "+39",
      cellulare: "3331234567",
      email: "marco.galli@example.com",
    },
    payments: {
      totale: 3400,
      inviati: 2200,
      da_dare: 1200,
    },
    courses_id: [77764555, 88887777],
    docs: {
      n_doc: "DL987654",
      l_doc: "MOTORIZZAZIONE",
      city_doc: "Milano",
      rilascio_doc: "15-09-2016",
      scadenza_doc: "08-04-2026",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  }
  

  
  
];


let corsi = [
  {
      _id:77764555,
      nome:"EIPASS",
      ente:"FORMAZIONE ENTE",
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
      ente:"FORMAZIONE ENTE",
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
    ente:"FORMAZIONE ENTE",
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

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [birthYearRange, setBirthYearRange] = useState({ start: "", end: "" });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");


const handleSearch = () => {
    // Filtra gli studenti in base ai filtri
    const filteredStudents = students.filter((student) => {
      const fullName = `${student.info.nome} ${student.info.cognome}`.toLowerCase();
      const isNameMatch = fullName.includes(searchQuery.toLowerCase());
      const isBirthYearMatch =
        (!birthYearRange.start || parseInt(student.info.dob.split("-")[2]) >= parseInt(birthYearRange.start)) &&
        (!birthYearRange.end || parseInt(student.info.dob.split("-")[2]) <= parseInt(birthYearRange.end));
      const isCourseMatch = !selectedCourse || student.courses_id.includes(parseInt(selectedCourse));
      const isProvinceMatch = !selectedProvince || student.info.prob.toLowerCase() === selectedProvince.toLowerCase();
      
      return isNameMatch && isBirthYearMatch && isCourseMatch && isProvinceMatch;
    });

    // Passa gli studenti filtrati al componente VisualizeResult per il rendering
    return <VisualizeResult results={filteredStudents} />;
  };

  return (
        <div className="container">
      <div className="row text-center">
        <h1 className="fs-1">Ricerca</h1>
      </div>
      <div id="searchinput" className="row">
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
        <button onClick={handleSearch}>Cerca</button>
      </div>
      <div className="row flex-grow-1 p-4">
        {handleSearch()} 
      </div>
    </div>
  );
}