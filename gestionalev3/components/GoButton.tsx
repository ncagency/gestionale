
import React from 'react';





interface GoButtonProps {
  destination: string;
}



const GoButton: React.FC<GoButtonProps> = ({ destination  }) => {
    
  
    const handleRedirect = () => {
      const destinationValue = `/${destination}`;
      window.location.href = destinationValue;
    };

  return (
    <div onClick={handleRedirect}
      className='px-4 py-1 fs-5 ms-auto align-self-end rounded-4 '
      style={{ cursor: 'pointer', background: 'linear-gradient(to right, #a44b8b, #ffb6f5) '}} // Aggiungi uno stile per mostrare che è cliccabile
    >
      <i className="text-white">View</i>
    </div>
  );
}

export default GoButton;
