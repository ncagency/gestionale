import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"

let navlinks = [
    { text: "Dashboard", icon: "bi bi-grid-1x2-fill", url: "/" },
    { text: "Search", icon: "bi bi-search", url: "/search" },
    { text: "Iscrizioni", icon: "bi bi-search", url: "/iscrizione" },
    { text: "Contabile", icon: "bi bi-calculator-fill", url: "/contabile" },
    { text: "Aggiungi", icon: "bi bi-sliders", url: "/aggiungi" },
  ];


export default function Navbar() {
    const style = {
      background: "linear-gradient(to right, #3b83ff, #2a59ac",
    }
  
    return (
        <div style={style}  className=" col-auto col-md-2 min-vh-100 rounded-end">
         
          <ul className="gap-1 fs-5 flex-column mt-5">


              <Link style={{ textDecoration: "none" }} href={navlinks[0].url}  className=" p-2">
              <div  className="d-flex gap-3 text-white ">
                  <i className={`bi ${navlinks[0].icon}`}></i> <p>{navlinks[0].text}</p>
                </div>
              </Link>

              <Link style={{ textDecoration: "none" }} href={navlinks[1].url}  className=" p-2">
              <div  className="d-flex gap-3 text-white ">
                  <i className={`bi ${navlinks[1].icon}`}></i> <p>{navlinks[1].text}</p>
                </div>
              </Link>

              <Link style={{ textDecoration: "none" }} href={navlinks[2].url}  className=" p-2">
              <div  className="d-flex gap-3 text-white ">
                  <i className={`bi ${navlinks[2].icon}`}></i> <p>{navlinks[2].text}</p>
                </div>
              </Link>
              
              <Link style={{ textDecoration: "none" }} href={navlinks[3].url}  className=" p-2">
              <div  className="d-flex gap-3 text-white ">
                  <i className={`bi ${navlinks[3].icon}`}></i> <p>{navlinks[3].text}</p>
                </div>
              </Link>
              
              <Link style={{ textDecoration: "none" }} href={navlinks[4].url}  className=" p-2">
              <div  className="d-flex gap-3 text-white ">
                  <i className={`bi ${navlinks[4].icon}`}></i> <p>{navlinks[4].text}</p>
                </div>
              </Link>
     
          </ul>
        </div>
     )
}