'use client' 
import React, { useState } from 'react';
import Rate from './Rate'; // Assicurati di importare il componente Rate correttamente

const Debts = ({ rates, userId }) => {
    const [openIndex, setOpenIndex] = useState(null);

    // Funzione per gestire il click del div
    const handleDivClick = (index) => {
        setOpenIndex((prevOpenIndex) => (prevOpenIndex === index ? null : index));
    };

    return (
        <div className="container">
            {rates.map((rateGroup, index) => (
                <div key={index} className='flex-column m-2 text-white' onClick={() => handleDivClick(index)}>
                    <div className='bg-warning p-2 rounded-3 w-50'><h2 className='fs-5'>{index + 1}) Rate</h2></div>
                    {openIndex === index && <Rate data={rateGroup} id={userId} index_debito={index} />}
                </div>
            ))}
        </div>
    );
};

export default Debts;
