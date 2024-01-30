// Importa ObjectId da mongodb
import { ObjectId } from 'mongodb';
import React from 'react';

interface ViewButtonProps {
    id: ObjectId;
    type: string;
}

const ViewButton: React.FC<ViewButtonProps> = ({ id, type }) => {
    const handleRedirect = () => {
        // Verifica se id è valido prima di chiamare toHexString
        const destinationValue = `/scheda/${type}/${id}`;
        window.location.href = destinationValue;
    };

    return (
        <div
            onClick={handleRedirect}
            className='px-4 py-1 fs-5 ms-auto align-self-end rounded-4 bg-primary'
            style={{ cursor: 'pointer' }}
        >
            <i className="bi bi-arrow-right"></i>
        </div>
    );
};

export default ViewButton;

