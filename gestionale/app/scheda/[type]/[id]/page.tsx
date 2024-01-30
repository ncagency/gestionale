'use client'
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Import Navbar (update with the correct path)
import Navbar from '@/app/components/Navbar';



interface UserDetailsProps {
    user: any;
    type: string;
  }
interface CourseDetailsProps {
    course: any;
    type: string;
  }
interface EntiDetailsProps {
    ente: any;
    type: string;
  }





const UserDetails: FC<UserDetailsProps> = ({ user, type }) => {
    
    
    return (
        <>
            <div className="container">
                Indietro
                <h1>Dettagli {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                <div className="row mt-5">
                    <div className="col-7"> 
                        <p className="mb-0">{user._id.toHexString()}</p>
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
 
const CourseDetails: FC<CourseDetailsProps> = ({ course, type }) => {
        return (
        <>
            <div className="container">
                Indietro
                <h1>Dettagli {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                <div className="row mt-5">
                    <div className="col-7"> 
                        <p className="mb-0">{course._id.toHexString()}</p>
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

const EntiDetails: FC<EntiDetailsProps> = ({ ente, type }) => {
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

interface TabDetailsProps {
    params: {
      type: string;
      // Add other necessary properties from params
    };
  }
  


const tabDetails: FC<TabDetailsProps> = ({ params }) => {
    const { type, id } = useParams();
    const [data, setData] = useState<any | null>(null);
  
    const apiUrl = `http://localhost:2000/${type}/${id}`;
  
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error('Errore durante la richiesta GET:', error);
        // Handle the error more detailedly if necessary
      }
    };
  
    useEffect(() => {
      if (type && id) {
        fetchData();
      }
    }, [type, id]);
  
    const components: Record<string, JSX.Element> = {
      students: <UserDetails user={data} type={type} />,
      workers: <UserDetails user={data} type={type} />,
      courses: <CourseDetails course={data} type={type} />,
      enti: <EntiDetails ente={data} type={type} />,
    };
    console.log(data)
    console.log(type)
    return (
      <main className="container-fluid d-flex flex-row">
        <Navbar />
        <div className="col-md-10 p-4">{type && components[type]}</div>
      </main>
    );
  };
  


export default tabDetails;