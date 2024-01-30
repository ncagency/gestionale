'use client'
import Navbar from "../../../components/Navbar"
import { useState,useEffect } from "react";
import { Courses } from "@/app/components/Search";
import { Enti } from "@/app/components/Search";
import axios from "axios";


const UserDetails = ({ user, type }: { user: any, type:string }) => {
    
    
    return (
        <>
            <div className="container">
                Indietro
                <h1>Dettagli {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                <div className="row mt-5">
                    <div className="col-7"> 
                        <p className="mb-0">{user._id}</p>
                        <h2>{user.info.nome} {user.info.secondo_nome} {user.info.cognome}</h2>
                        <h3>{user.info.cf}</h3>
                    </div>
                    <div className="col-5 text-right ml-auto">
                        <p className="mb-1">{user.info.prefix_cell + " " + user.info.cellulare}</p>
                        <p>{user.info.email}</p>
                    </div>
                </div>
                <div className="row mt-0 mb-0">
                    <div className="col-7">
                            <label>
                            Data di Nascita:
                        </label>
                        <h2>{user.info.dob}</h2>
                        <label>
                            Luogo di Nascita:
                        </label>
                        <h2 className="mt-0">{user.info.lob} ({user.info.prob}), {user.info.state}</h2>
                        <label>
                            {user.info.capb}
                        </label>
                    </div>
                    {(type == "student" ) && <div className="col-5 bg-primary text-white p-3 border rounded-3 fs-3 ">
                        <label className="fs-5">
                            Pagamenti:
                        </label>
                        <p className="mb-0 ">Tot: {user.payments.totale}</p>
                        <p className="mb-0">Ricevuti: {user.payments.totale}</p>
                        <p className="mb-0">In Sospeso: {user.payments.totale}</p>
                    </div>}
                </div>
                <div className="row mt-0">
                    <div className="col-4">
                        <label>
                            Indirizzo Residenza:
                        </label>
                        <h3>{user.info.res}</h3>
                        <p>{user.info.cap_res}</p>
                    </div>
                    <div className="col-4">
                        <label>
                            Indirizzo di Domicilio
                        </label>
                        <h3>{user.info.dom}</h3>
                        <p>{user.info.cap_dom}</p>
                    </div>
                  
                </div>
                
                
                {(type == "student" ) && 
                    <div className="row bg-primary mt-0">
                            <div className="col-4 bg-secondary">
                                <ul>
                                    <li>
                                        Corso1 | In corso
                                    </li>
                                    <li>
                                        Corso2 | Completo
                                    </li>
                                    <li>
                                        Corso1 | Annullato
                                    </li>
                                    <li>
                                        Corso2 | In corso
                                    </li>
                                </ul>
                            </div>
                            <div className="col-4 bg-warning">
                                <p>{user.docs.n_doc} {user.docs.l_doc} {user.docs.city_doc}</p>
                                <p> Emissione: {user.docs.rilascio} Scadenza{user.docs.scadenza}</p>
                                <div>
                                    <ul> //IMPLEMENTA CON DEGLI SCARICABILI
                                        <li>FRONTE</li>
                                        <li>RETRO</li>
                                        <li>SELFIE?</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-4 bg-secondary">
                                <p>Vari documenti</p>
                            </div>
                    </div>}
                
                {(type == "worker" ) && 
                    <div className="row bg-primary mt-0">
                        <ul>
                            <li>
                                Permesso 1 | o Si o No // implementa permessi
                            </li>
                        </ul>
                    </div>}
            </div>

        </>
    )
}

const CourseDetails = ({ course, type }: { course: Courses, type:string}) => {
    
    return (
        <>
            <div className="container">
                Indietro
                <h1>Dettagli {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                <div className="row mt-5">
                    <div className="col-7"> 
                        <p className="mb-0">{course._id}</p>
                        <h2>{course.nome}</h2>
                        <h3>{course.ente}</h3>
                    </div>
                    <div className="col-5 text-right ml-auto">
                        <p className="mb-1"></p>
                        <p></p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-7">
                            <label>
                            Data di Nascita:
                        </label>
                        <h2></h2>
                        <label>
                            Luogo di Nascita:
                        </label>
                        <h2></h2>
                        <label>
                          
                        </label>
                    </div>
                    <div className="col-5 bg-primary text-white p-3 border rounded-3 fs-3 ">
                        <label className="fs-5">
                            Pagamenti:
                        </label>
                        <p className="mb-0 mt-4">Tot: </p>
                        <p className="mb-0">Ricevuti: </p>
                        <p className="mb-0">In Sospeso: </p>
                    </div>
                </div>
                <div className="row mt-4">
                    
                    <div className="col-4">
                        <label>
                            Indirizzo Residenza:
                        </label>
                        <h3></h3>
                        <p></p>
                    </div>
                    <div className="col-4">
                        <label>
                            Indirizzo di Domicilio
                        </label>
                        <h3></h3>
                        <p></p>
                    </div>
                  
                </div>
            </div>

        </>
    )
}

const EntiDetails = ({ente, type} : {ente: Enti, type:string}) =>{
    return (
        <>
            <div className="container">
                Indietro
                <h1>Dettagli {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                <div className="row mt-5">
                    <div className="col-7"> 
                        <p className="mb-0">{ente._id}</p>
                        <h2>{ente.nome}</h2>
                        <h3>{ente.city} {ente.prob}</h3>
                    </div>
                    <div className="col-5 text-right ml-auto">
                        <p className="mb-1"></p>
                        <p>{ente.payments.da_dare} {ente.payments.da_ricevere} || </p>
                    </div>
                </div>
              
            </div>

        </>
    )
}





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
    
    let ente = {
            _id:12356666,
            nome:"ANSIDONNA",
            city:"Caserta",
            prob:"CE",
            payments:{
                da_dare:1000,
                da_ricevere:200
            }
        }
    

    const [courseData, setCourseData] = useState(corso);
    const [studentData, setStudentData] = useState(student);
    const [workerData, setWorkerData] = useState(worker);
    const [enteData, setEnteData] = useState(ente);

    const apiUrl = `http://localhost:2000/${params.type}/${params.id}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (params.type == "students" ) { setStudentData(response.data); }     
        else if  (params.type == "workers" ) { setWorkerData(response.data);}
        else if (params.type == "courses" ) { setCourseData(response.data);}
        else if  (params.type == "enti" ) { setEnteData(response.data);}
        else {

        }
    
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
                    { (params.type == "students" ) && <UserDetails type={params.type}  user={studentData} />}
                    { (params.type == "workers") && <UserDetails type={params.type}  user={workerData} />}
                    { (params.type == "courses") && <CourseDetails type={params.type} course={courseData} />}
                    { (params.type == "enti") && <EntiDetails type={params.type} ente={enteData} />}
                </div>
        </main>
    );
  }; 

export default tabDetails;