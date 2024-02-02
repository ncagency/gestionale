'use client'

import Navbar from "../components/Navbar";
import { Search } from '../components/Search'
import CategoryTabs from "../components/CategoryTabs";
import Link from "next/link";




export default function Search_Page() {
    const type = "workers"

    return (
      <main className="container-fluid d-flex flex-row">
        <Navbar />
        <div className="col-md-10 p-4">
        <Link  href="/"><p>Indietro</p></Link>
              <div className="row text-center">
              <h1 className="fs-1">Ricerca {type}</h1>
            </div>

            <CategoryTabs />

            <p>Seleziona una tab per continuare</p>

        </div>
      </main>
    )
  }