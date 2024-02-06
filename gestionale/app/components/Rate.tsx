import React, { useState } from 'react';
import axios from 'axios';

const Rate = ({ data, id }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [modifiedData, setModifiedData] = useState([...data]);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSave = async (index) => {
    try {
      await axios.post(`http://127.0.0.1:2000/edit/rate/${id}/${index}`, modifiedData[index]);
      setEditIndex(-1);
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
    }
  };

  const handleCancel = () => {
    setEditIndex(-1);
    // Revertire eventuali modifiche allo stato
  };

  const handleInputChange = (event, field, index) => {
    const newData = [...modifiedData];
    newData[index][field] = event.target.value;
    setModifiedData(newData);
  };

  const handleCheckboxChange = (event, index) => {
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
                  <input type="text" value={item.valorerata} onChange={(e) => handleInputChange(e, 'valorerata', index)} />
                ) : (
                  item.valorerata
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input type="text" value={item.datascadenza} onChange={(e) => handleInputChange(e, 'datascadenza', index)} />
                ) : (
                  item.datascadenza
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
