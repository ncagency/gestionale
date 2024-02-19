'use client' 
import React, { useState } from 'react';
import Rate from './Rate'; // Assicurati di importare il componente Rate correttamente
import axios from 'axios';


const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"

const style = {
    background: "linear-gradient(to right, #3b83ff, #2a59ac)",
  }

const Debts = ({ rates, userId }:{ rates:any, userId:any }) => {
    const [openIndex, setOpenIndex] = useState(null);

    // Funzione per gestire il click del div
    const handleDivClick = (index:any) => {
        setOpenIndex((prevOpenIndex) => (prevOpenIndex === index ? null : index));
    };

    // Funzione per gestire il clic sul bottone Flag
    const handleFlagButtonClick = async (index: number) => {
        try {

            let response = await axios.post(`${apiURL}/check/${userId}/${index}`)
            console.log(response.data)
            window.location.reload();

        } catch (error) {
            console.error('Errore durante l\'aggiornamento del valore nel database:', error);
        }
    };

    return (
        <div className="container py-4">
            {rates.map((rateGroup:any, index:any) => (
                <div key={index} className='flex-column m-2 text-white' onClick={() => handleDivClick(index)}>
                    <div className={`d-flex justify-content-between p-2 rounded-3 w-50 ${rateGroup.flag ? 'bg-danger' : 'bg-warning'}`}>
                        <h2 className='fs-5'> {rateGroup.nome} {rateGroup.anno_accademico}</h2>
                        {rateGroup.flag ? (<h1 className='text-white'>Pagato</h1>) : ''}
                        <div className='bg-success p-2 rounded-4' style={{cursor:'pointer'}} onClick={() => handleFlagButtonClick(index)}>
                            Flag
                        </div>
                    </div>
                   <Rate data={rateGroup} id={userId} index_debito={index} />
                </div>
            ))}
        </div>
    );
};

export default Debts;
