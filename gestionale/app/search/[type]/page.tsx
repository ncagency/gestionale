'use client'

import Navbar from "../../components/Navbar"
import { Search } from "../../components/Search";
import CategoryTabs from "../../components/CategoryTabs";
import { useState,useEffect } from "react";
import axios from "axios";



 const Search_Page = ({ params })=> {

    
    const [data, setData] = useState(null);
    const apiUrl = `http://localhost:2000/${params.type}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
        console.log(data);
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
              <div className="row text-center">
              <h1 className="fs-1">Ricerca {params.type}</h1>
            </div>

            <CategoryTabs />

            <Search datas={data} type={params.type} />
        </div>
      </main>
    )
  }
  
  export default Search_Page