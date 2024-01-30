'use client'

import Navbar from "../components/Navbar";
import { Search } from '../components/Search'
import CategoryTabs from "../components/CategoryTabs";


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



export default function Search_Page() {
    const type = "students"

    return (
      <main className="container-fluid d-flex flex-row">
        <Navbar />
        <div className="col-md-10 p-4">
              <div className="row text-center">
              <h1 className="fs-1">Ricerca {type}</h1>
            </div>

            <CategoryTabs />

            <Search datas={workers} type={type}/>

        </div>
      </main>
    )
  }