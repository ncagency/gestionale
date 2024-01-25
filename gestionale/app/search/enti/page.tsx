'use client'

import Navbar from "../../components/Navbar"
import { Search } from "../../components/Search";
import CategoryTabs from "../../components/CategoryTabs";



let enti = [
  {
      _id:12356666,
      nome:"ANSIDONNA",
      prob:"CE",
      payments:{
          da_dare:0,
          da_ricevere:0
      }
  },
  ]




export default function Search_Page() {
    const type = "enti"

    return (
      <main className="container-fluid d-flex flex-row">
        <Navbar />
        <div className="col-md-10 p-4">
              <div className="row text-center">
              <h1 className="fs-1">Ricerca {type}</h1>
            </div>

            <CategoryTabs />

            <Search datas={enti} type={type}/>

        </div>
      </main>
    )
  }
  