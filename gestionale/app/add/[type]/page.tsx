'use client'
import Navbar from "@/app/components/Navbar";
import { useState } from "react";
import { Courses } from "@/app/components/Search";
import Link from "next/link";





const UserForm = () => {

    return (
        <div className="container">
                <div className="fs-1">Aggiungi Studente</div>
                <form>
                    <div className="row ">
                        <div className="gap-2 form-group col-7 ">
                            <div className="d-flex mt-4 h-25 align-items-center gap-3">
                                    <input type="text" className="form-control w-25" placeholder="Nome" />
                                    <input type="text" className="form-control w-25" placeholder="Secondo Nome" />
                                    <input type="text" className="form-control w-75" placeholder="Codice Fiscale" />
                            </div>
                          
                        
                        </div>
                          
                       

                    </div>
                    <div className="form-group mt-3  col flex-column">
                                <input type="text" className="form-control w-50 mb-3" placeholder="Codice Fiscale" />
                                <label>Data di Nascita</label>
                                <input type="text" className="form-control w-25 mb-2" placeholder="GG-MM-YYYY" />
                                <small className="form-text text-muted">Rispettare il formato della data di nascita <br /> o potrebbero esserci errori nel salvataggio</small>
                                <div className="flex-column"> 
                                    <label className="mt-4">Luogo di Nascita</label>
                                    <div className="d-flex gap-2 mt-2">
                                        <input type="text" className="form-control w-25 " placeholder="Città" />
                                        <input type="text" className="form-control w-25" placeholder="Provincia(XX)" />
                                    </div>
                                    <div className="d-flex gap-2 mt-2">
                                        <input type="text" className="form-control w-25" placeholder="CAP" />
                                        <input type="text" className="form-control w-25 " placeholder="Stato" />
                                    </div>  
                                </div>  
                        
                        </div>
 
                    <div className="flex-column h-25 align-items-center">
                                <div className="row mt-5">
                                        <div className="col-6 ">
                                            <label className="fs-4 mb-1">Residenza</label>
                                            <input type="text" className="form-control w-75" placeholder="Indirizzo" />
                                            <div className="d-flex gap-2 mt-2">
                                                <input type="text" className="form-control w-25" placeholder="Città" />
                                                <input type="text" className="form-control w-25" placeholder="CAP" />
                                                <input type="text" className="form-control w-25" placeholder="Stato" /> 
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <label className="fs-4 mb-1">Domicilio</label>
                                                <input type="text" className="form-control w-75" placeholder="Indirizzo" />
                                                <div className="d-flex gap-2 mt-2">
                                                    <input type="text" className="form-control w-25" placeholder="Città" />
                                                    <input type="text" className="form-control w-25" placeholder="CAP" />
                                                    <input type="text" className="form-control w-25" placeholder="Stato" /> 
                                                </div>
                                        </div>
                                </div>
                     </div>
                        <br/>
                     <div className="d-flex col-6 mt-5 gap-2">
                        <input type="text" className="form-control w-75" placeholder="+39" />
                        <input type="text" className="form-control w-75" placeholder="Numero" />
                        <input type="text" className="form-control w-75" placeholder="email@example.com" />
                     </div>
                   
                
                </form> 
        </div>
    
    )
}





const AddForm = ({dataType} : {dataType:string}) => {
    return ( 
        <>
            <UserForm />
        </>
    )
}




const tabDetails = ({ params })=> {

    return (
        <main className="container-fluid d-flex flex-row">
                <Navbar />
                <div className="p-4">
                    <Link href="/add"><p>Indietro</p></Link>
                </div>
                <div className="col-md-10 p-4">
                    { (params.type == "student" ) && <AddForm dataType={params.type}/>}
                    { (params.type == "worker") && <p>Aggiungi Worker</p>}
                    { (params.type == "ente") && <p>Aggiungi Ente</p>}
                    { (params.type == "corso") && <p>Aggiungi Corso</p>}
                </div>
        </main>
    );
  }; 

export default tabDetails;