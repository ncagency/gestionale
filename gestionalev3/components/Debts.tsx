'use client' 
import React, { useState } from 'react';
import Rate from './Rate'; // Assicurati di importare il componente Rate correttamente
import axios from 'axios';


const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"


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
                    <div className={`p-2 rounded-3 w-50 ${rateGroup.flag ? 'bg-warning' : 'bg-secondary'}`}>
                        <h2 className='fs-5'> {rateGroup.nome}</h2>
                        
                        <button onClick={() => handleFlagButtonClick(index)}>Flag</button>
                        </div>
                   <Rate data={rateGroup} id={userId} index_debito={index} />
                </div>
            ))}
        </div>
    );
};

export default Debts;
