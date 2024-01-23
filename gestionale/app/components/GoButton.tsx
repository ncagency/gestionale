import React from 'react';

interface GoButtonProps {
  destination: string;
}

const GoButton: React.FC<GoButtonProps> = ({ destination }) => {
    
    console.log(destination)
  return (
    <div
      className='px-4 py-1 fs-5 ms-auto align-self-end rounded-4 bg-primary'
      style={{ cursor: 'pointer' }} // Aggiungi uno stile per mostrare che è cliccabile
    >
      <i className="bi bi-arrow-right"></i>
    </div>
  );
}

export default GoButton;
