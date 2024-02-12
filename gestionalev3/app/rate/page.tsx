'use client'
import { useState, useEffect } from 'react';


interface ContabilitaDocument {
    _id: { $oid: string };
    cronologia_transazioni: any[]; // Puoi definire un'interfaccia più specifica se necessario
    enti: { _id: string; nome: string; totale: number; inviati: number; da_inviare: number }[];
    students: {
      _id: string;
      totale: number;
      saldati: number;
      in_sospeso: number;
      rate: { valore: string; data: string; pagata: boolean }[][];
    }[];
    courses: {
      _id: string;
      name: string;
      costo: number;
      stock: number;
      venduti: number;
      totale_entrate: number;
      totale_uscite: number;
      totale_profit: number;
    }[];
  }

// Componente React
const RateStudenteComponent  = () => {
  const [contabilitaData, setContabilitaData] = useState<ContabilitaDocument | null>(null);

  useEffect(() => {
    const fetchContabilitaData = async () => {
      try {
        const response = await fetch('http://localhost:2000/contabilita');
        const data = await response.json();
        setContabilitaData(data);
      } catch (error) {
        console.error('Errore durante il recupero dei dati dalla API:', error);
      }
    };

    fetchContabilitaData();
  }, []);


  if (!contabilitaData) return <div>Caricamento...</div>;
  console.log(contabilitaData)
  // Supponendo che tu abbia l'ID dello studente, puoi cercare le rate corrispondenti
  const studenteId = '65c9ea80f04ce493d0c077ef';
  const studente = contabilitaData.students.find(studente => studente._id === studenteId);

  if (!studente) return <div>Studente non trovato</div>;

  return (
    <div>
      <h2>Rate dello studente</h2>
      <ul>
        {studente.rate.map((rateGruppo, index) => (
          <li key={index}>
            <h3>Gruppo {index + 1}</h3>
            <ul>
              {rateGruppo.map((rata, index) => (
                <li key={index}>
                  {rata.valore} - {rata.data} - {rata.pagata ? 'Pagata' : 'Non pagata'}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RateStudenteComponent;
