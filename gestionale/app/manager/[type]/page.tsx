'use client'
import Navbar from "../../components/Navbar";
import  { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";
import StudentAdd from '@/app/components/StudentAdd'
import CourseAdd from "@/app/components/CourseAdd";

export const province = [
  "","AG", "AL", "AN", "AO", "AR", "AP", "AT", "AV", "BA", "BT", "BL", "BN", "BG", "BI", "BO", "BZ", "BS", "BR", "CA", "CL",
  "CB", "CI", "CE", "CT", "CZ", "CH", "CO", "CS", "CR", "KR", "CN", "EN", "FM", "FE", "FI", "FG", "FC", "FR", "GE", "GO",
  "GR", "IM", "IS", "AQ", "SP", "LT", "LE", "LC", "LI", "LO", "LU", "MC", "MN", "MS", "MT", "VS", "ME", "MI", "MO", "MB",
  "NA", "NO", "NU", "OG", "OT", "OR", "PD", "PA", "PR", "PV", "PG", "PU", "PE", "PC", "PI", "PT", "PN", "PZ", "PO", "RG",
  "RA", "RE", "RI", "RN", "RM", "RO", "SA", "VS", "SS", "SV", "SI", "SR", "SO", "TA", "TE", "TR", "TO", "OG", "TP", "TN",
  "TV", "TS", "UD", "VA", "VE", "VB", "VC", "VR", "VV", "VI", "VT"
];
export const paesiOrdinati = ["Italia"]




const ManagerMenu = ({params})  => {
  
  let type = params.type

return (
    <div className="container-fluid d-flex flex-row">
      <Navbar />
      <div className="col-md-10 p-4">
        <Link  href="/manager"><p>Indietro</p></Link>
            
            
           { type == "students" && <StudentAdd />} 
           { type == "courses" && <CourseAdd />}  
            
      </div>

 
    </div>
  );
};

export default ManagerMenu