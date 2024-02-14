'use client'
import React, { useState } from 'react';
import axios from 'axios';

const Rate = ({ data, id , index_debito}:{ data:any, id:any , index_debito:any}) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [modifiedData, setModifiedData] = useState([...data]);

  const handleEdit = (index:any) => {
    setEditIndex(index);
  };

  const handleSave = async (index:any) => {
    try {
      await axios.post(`http://51.210.108.56:2000/edit/rate/${id}/${index}/${index_debito}`, modifiedData[index]);
      setEditIndex(-1);
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
    }
  };

  const handleCancel = () => {
    setEditIndex(-1);
    // Revertire eventuali modifiche allo stato
  };

  const handleInputChange = (event:any, field:any, index:any) => {
    const newData = [...modifiedData];
    newData[index][field] = event.target.value;
    setModifiedData(newData);
  };

  const handleCheckboxChange = (event:any, index:any) => {
    const newData = [...modifiedData];
    newData[index].pagata = event.target.checked;
    setModifiedData(newData);
  };

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
          {modifiedData.map((item, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input type="text" value={item.valore} onChange={(e) => handleInputChange(e, 'valore', index)} />
                ) : (
                  item.valore
                )}
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
                  item.pagata ? 'Pagata' : 'Non Pagata'
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <div>
                    <button className="btn btn-success" onClick={() => handleSave(index)}>Salva</button>
                    <button className="btn btn-danger" onClick={handleCancel}>Annulla</button>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleEdit(index)}>Modifica</button>
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
