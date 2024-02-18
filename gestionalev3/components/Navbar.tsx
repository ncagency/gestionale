import Link from "next/link";
import { useWorkerId } from "./Login";

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
    const workerId = useWorkerId()
    console.log(workerId)
     return (
        <div style={style}  className=" col-auto col-md-2 min-vh-100 rounded-end">
         
          <ul className="gap-1 fs-5 flex-column mt-5">
            {navlinks.map((navlink, index) => (
              <Link style={{ textDecoration: "none" }} href={navlink.url} key={index} className=" p-2">
              <div  className="d-flex gap-3 text-white ">
                  <i className={`bi ${navlink.icon}`}></i> <p>{navlink.text}</p>
                </div>
              </Link>
            ))}
          </ul>
        </div>
     )
}