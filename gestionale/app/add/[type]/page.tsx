'use client'
import Navbar from "@/app/components/Navbar";
import { useState } from "react";
import { Courses } from "@/app/components/Search";
import Link from "next/link";




const tabDetails = ({ params })=> {
    let student =   {
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
  }
    let corso = 
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
    }
    let worker = {
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



    const [courseData, setCourseData] = useState(corso);
    const [studentData, setStudentData] = useState(student);
    const [workerData, setWorkerData] = useState(worker);
    return (
        <main className="container-fluid d-flex flex-row">
                <Navbar />
                <div className="p-4">
                    <Link href="/add"><p>Indietro</p></Link>
                </div>
                <div className="col-md-10 p-4">
                    { (params.type == "student" ) && <p>Aggiungi Studente</p>}
                    { (params.type == "worker") && <p>Aggiungi Worker</p>}
                    { (params.type == "ente") && <p>Aggiungi Ente</p>}
                    { (params.type == "corso") && <p>Aggiungi Corso</p>}
                </div>
        </main>
    );
  }; 

export default tabDetails;