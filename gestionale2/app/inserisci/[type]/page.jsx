'use client'

import StudentForm from "@/app/components/StudentForm";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { useState } from "react";







const ManagerMenu = ({params})  => {
    
    
    let type = params.type

    const [formData, setFormData] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          // Effettua la chiamata POST utilizzando Axios
          const response = await axios.post(`http://127.0.0.1:2000/add/${type}`, formData);
      
          // Gestisci la risposta qui, ad esempio loggando la risposta
          console.log('Risposta API:', response.data);
      
          // Resetta il form o esegui altre azioni necessarie
        } catch (error) {
          // Gestisci gli errori qui, ad esempio loggando l'errore
          console.error('Errore API:', error);
        }
      };
      
    
      
      const province = [
        "","AG", "AL", "AN", "AO", "AR", "AP", "AT", "AV", "BA", "BT", "BL", "BN", "BG", "BI", "BO", "BZ", "BS", "BR", "CA", "CL",
        "CB", "CI", "CE", "CT", "CZ", "CH", "CO", "CS", "CR", "KR", "CN", "EN", "FM", "FE", "FI", "FG", "FC", "FR", "GE", "GO",
        "GR", "IM", "IS", "AQ", "SP", "LT", "LE", "LC", "LI", "LO", "LU", "MC", "MN", "MS", "MT", "VS", "ME", "MI", "MO", "MB",
        "NA", "NO", "NU", "OG", "OT", "OR", "PD", "PA", "PR", "PV", "PG", "PU", "PE", "PC", "PI", "PT", "PN", "PZ", "PO", "RG",
        "RA", "RE", "RI", "RN", "RM", "RO", "SA", "VS", "SS", "SV", "SI", "SR", "SO", "TA", "TE", "TR", "TO", "OG", "TP", "TN",
        "TV", "TS", "UD", "VA", "VE", "VB", "VC", "VR", "VV", "VI", "VT"
      ];
      const paesiOrdinati = ["Italia"]

    
    
    return (
        <>
        
        <div className="flex w-screen">
        <Navbar />
        <div className="p-4 w-full ">
            <p>Indietro</p>
            <form onSubmit={handleSubmit}>
                <button type="submit">Invia Dati</button>
                <StudentForm />


            </form>
        </div>
      </div>
        </>
    )
}


export default ManagerMenu