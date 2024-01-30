'use client'

import Navbar from "../../components/Navbar"
import { Search } from "../../components/Search";
import CategoryTabs from "../../components/CategoryTabs";
import { useState,useEffect } from "react";
import axios from "axios";

const students = [
  {
    "info": {
      "nome": "Luca",
      "secondo_nome": "Jr",
      "cognome": "Valori",
      "dob": "25-05-2001",
      "lob": "Benevento",
      "prob": "BN",
      "capb": 82100,
      "state": "Italy",
      "cf": "LVHS01MSHWU12",
      "res": "Via Avellino 28",
      "cap_res": 82100,
      "dom": "Via Avellino 28",
      "cap_dom": 82100,
      "prefix_cell": "+39",
      "cellulare": "3662731403",
      "email": "gerardo.dagostino12@gmail.com",
    },
    "payments": {
      "totale": 3500,
      "inviati": 2000,
      "da_dare": 0,
    },
    "courses_id": [77764555, 29388899],
    "docs": {
      "n_doc": "CA1177899",
      "l_doc": "COMUNE",
      "city_doc": "Benevento",
      "rilascio_doc": "22-01-2023",
      "scadenza_doc": "25-05-2033",
      "immagini": {
        "path": "",
        "fronte": "",
        "retro": "",
        "vari_doc": [{ "path": "" }],
      },
    },
  },
  {
    "info": {
      "nome": "Luca",
      "secondo_nome": "Jr",
      "cognome": "Valori",
      "dob": "25-05-2001",
      "lob": "Benevento",
      "prob": "BN",
      "capb": 82100,
      "state": "Italy",
      "cf": "LVHS01MSHWU12",
      "res": "Via Avellino 28",
      "cap_res": 82100,
      "dom": "Via Avellino 28",
      "cap_dom": 82100,
      "prefix_cell": "+39",
      "cellulare": "3662731403",
      "email": "gerardo.dagostino12@gmail.com",
    },
    "payments": {
      "totale": 3500,
      "inviati": 2000,
      "da_dare": 0,
    },
    "courses_id": [77764555, 29388899],
    "docs": {
      "n_doc": "CA1177899",
      "l_doc": "COMUNE",
      "city_doc": "Benevento",
      "rilascio_doc": "22-01-2023",
      "scadenza_doc": "25-05-2033",
      "immagini": {
        "path": "",
        "fronte": "",
        "retro": "",
        "vari_doc": [{ "path": "" }],
      },
    },
  },
  {
    "info": {
      "nome": "Luca",
      "secondo_nome": "Jr",
      "cognome": "Valori",
      "dob": "25-05-2001",
      "lob": "Benevento",
      "prob": "BN",
      "capb": 82100,
      "state": "Italy",
      "cf": "LVHS01MSHWU12",
      "res": "Via Avellino 28",
      "cap_res": 82100,
      "dom": "Via Avellino 28",
      "cap_dom": 82100,
      "prefix_cell": "+39",
      "cellulare": "3662731403",
      "email": "gerardo.dagostino12@gmail.com",
    },
    "payments": {
      "totale": 3500,
      "inviati": 2000,
      "da_dare": 0,
    },
    "courses_id": [77764555, 29388899],
    "docs": {
      "n_doc": "CA1177899",
      "l_doc": "COMUNE",
      "city_doc": "Benevento",
      "rilascio_doc": "22-01-2023",
      "scadenza_doc": "25-05-2033",
      "immagini": {
        "path": "",
        "fronte": "",
        "retro": "",
        "vari_doc": [{ "path": "" }],
      },
    },
  }
];
const workers = [
  {
  _id: 198328983,
  info: {
      nome: "Mario",
      secondo_nome: "",
      cognome: "Merola",
      dob: "10-10-1998", //data di nascita
      lob: "Roma", //luogo di nascita
      prob: "RM", //provincia di nascita
      capb: "00139", // cap luogo nascita
      state: "Italy", //stato di nascita
      cf: "ACACASBUACACASBU",  //codice fiscale
      res: "Via delle Vie", //indirizzo residenza
      cap_res: "00139", //CAP RESIDENZA
      dom: "Via delle Vie", //indirizzo domicilio
      cap_dom: "00139", // CAP DOMICILIO
      prefix_cell: "+39",
      cellulare: "3333333333",
      email: "mail@gmai.com",
    },
    permessi:{
      p1:"string"
    }
  }
];



 const Search_Page = ({ params })=> {

    
    const [data, setData] = useState(null);
    const apiUrl = `http://localhost:2000/${params.type}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error('Errore durante la richiesta GET:', error);
      }
    };
  
    // Esegui la richiesta GET quando il componente si monta
    useEffect(() => {
      fetchData();
    }, []); // Assicurati di passare un array vuoto come secondo argomento per eseguire l'effetto solo al mount del componente

    
    return (
      <main className="container-fluid d-flex flex-row">
        <Navbar />
        <div className="col-md-10 p-4">
              <div className="row text-center">
              <h1 className="fs-1">Ricerca {params.type}</h1>
            </div>

            <CategoryTabs />

            <Search datas={data} type={params.type} />
        </div>
      </main>
    )
  }
  
  export default Search_Page