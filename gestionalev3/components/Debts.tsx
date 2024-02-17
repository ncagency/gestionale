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

    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = e.target.checked;

        try {
            // Effettua una richiesta al tuo backend per aggiornare il valore nel database
            const response = await axios.post(`${apiURL}/checkflag/`, {
                index, // Passa eventuali altri dati per identificare l'elemento nel database
                newValue,
            });

            console.log(response.data); // Se desideri gestire la risposta dal server
        } catch (error) {
            console.error('Errore durante l\'aggiornamento del valore nel database:', error);
        }
    };

    return (
        <div className="container py-4">
            {rates.map((rateGroup:any, index:any) => (
                <div key={index} className='flex-column m-2 text-white' onClick={() => handleDivClick(index)}>
                    <div className='bg-warning p-2 rounded-3 w-50'>
                        <h2 className='fs-5'> {rateGroup.nome}</h2>

                        <input 
                            type="checkbox" 
                            checked={rateGroup.flag} 
                            onChange={(e) => handleCheckboxChange(e, index)} 
                        />                 </div>
                   <Rate data={rateGroup} id={userId} index_debito={index} />
                </div>
            ))}
        </div>
    );
};

export default Debts;
