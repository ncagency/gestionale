import React from 'react';
import Rate from './Rate'; // Assicurati di importare correttamente il componente Rate

const Debts = ({ rates, userId }) => {
  return (
    <div className="container">
      {rates.map((rateGroup, index) => (
        <div key={index}>
          <h2>Debito {index + 1}</h2>
          <Rate data={rateGroup} id={userId} index_debito={index} />
        </div>
      ))}
    </div>
  );
};

export default Debts;