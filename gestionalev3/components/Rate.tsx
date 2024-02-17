'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styleBox = {
  background: "linear-gradient(to right, #3b83ff, #2a59ac)",
  cursor: "pointer"
}
const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"

const Rate = ({ data, id, index_debito }: { data: any; id: any; index_debito: any }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [modifiedData, setModifiedData] = useState(JSON.parse(JSON.stringify(data)));
  const [rate, setRate] = useState<any>()

  const handleEdit = (index: any) => {
    setEditIndex(index);
  };
  
  const handleSave = async (index: any) => {
    try {
      await axios.post(`${apiURL}/edit/rate/${id}/${index}/${index_debito}`, modifiedData[index]);
      setEditIndex(-1);
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
    }
  };

  const handleCancel = () => {
    setEditIndex(-1);
    // Revertire eventuali modifiche allo stato
  };

  const handleInputChange = (event: any, field: any, index: any) => {
    const newData = JSON.parse(JSON.stringify(modifiedData)); // Copia profonda
    newData[index][field] = event.target.value;
    setModifiedData(newData);
  };

  const handleCheckboxChange = (event: any, index: any) => {
    const newData = JSON.parse(JSON.stringify(modifiedData)); // Copia profonda
    newData[index].pagata = event.target.checked;
    setModifiedData(newData);
  };

  const getRate = async () => {

    try {
      let contabile = await axios.get(`${apiURL}/contabile`);
      setRate(contabile);
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
    } 

  }
  useEffect(()  => {
    getRate()
  });

  return (
    <div className="container">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Valore Rata</th>
            <th>Data Scadenza</th>
            <th>Pagata</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {modifiedData.map((item: any, index: any) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <label  onChange={(e) => handleInputChange(e, 'valore', index)}>{item.valore} €</label>
                ) : (
                item.valore 
                )} €
              </td>
              <td>
                {editIndex === index ? (
                  <input type="text" value={item.data} onChange={(e) => handleInputChange(e, 'data', index)} />
                ) : (
                  item.data
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input type="checkbox" checked={item.pagata} onChange={(e) => handleCheckboxChange(e, index)} />
                ) : (
                  item.pagata ? `Pagata il ${item.pagatoIl} ` : 'Non Pagata'
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <div>
                    <button className="btn btn-success" onClick={() => handleSave(index)}>Salva</button>
                    <button className="btn btn-danger" onClick={handleCancel}>Annulla</button>
                  </div>
                ) : (
                  <button style={styleBox} className="btn text-white" onClick={() => handleEdit(index)}>Modifica</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rate;
