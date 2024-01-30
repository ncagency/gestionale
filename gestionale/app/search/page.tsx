'use client'

import Navbar from "../components/Navbar";
import { Search } from '../components/Search'
import CategoryTabs from "../components/CategoryTabs";





export default function Search_Page() {
    const type = "workers"

    return (
      <main className="container-fluid d-flex flex-row">
        <Navbar />
        <div className="col-md-10 p-4">
              <div className="row text-center">
              <h1 className="fs-1">Ricerca {type}</h1>
            </div>

            <CategoryTabs />

            

        </div>
      </main>
    )
  }