// Importa ObjectId da mongodb
import { ObjectId } from 'mongodb';
import React from 'react';



const ViewButton = ({ id, type }) => {

    const handleRedirect = () => {
        // Verifica se id è valido prima di chiamare toHexString
        const destinationValue = `/scheda/${type}/${id}`;
        window.location.href = destinationValue;
    };
   
    return (
        <div
            onClick={handleRedirect}
            className='d-flex align-content-center text-white'
            style={{ cursor: 'pointer' }}
        >
            <div>O</div>
        </div>
    );
};

export default ViewButton;

