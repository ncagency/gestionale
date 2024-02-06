'use client'
import  { useState, ChangeEvent, FormEvent, FC } from "react";
import axios from "axios";
import Link from "next/link";
import { province,paesiOrdinati } from "../manager/[type]/page";


function redirectToHome(query:string) {
    location.href = `http://127.0.0.1:3000/${query}`;
  }


const StudentAdd  = () => {

  let type = "students";

  // Stato per il form e le rate di pagamento
  const [formData, setFormData] = useState({
    info: {
      nome: '',
      secondo_nome: '',
      cognome: '',
      sesso:'',
      dob: '',
      lob: '',
      prob: '',
      state: '',
      cf: '',
      res: '',
      res_city: '',
      res_prov: '',
      state_res: '',
      dom: '',
      dom_city: '',
      dom_prov: '',
      state_dom: '',
      cellulare: '',
      email: '',
    },
    payments: {
      totale: 0,
      saldati: 0,
      in_sospeso: 0,
      rate: [] // Aggiunto array per le rate di pagamento
    },
    courses_id: [],
    docs: {
      n_doc: '',
      l_doc: '',
      city_doc: '',
      rilascio_doc: '',
      scadenza_doc: '',
      immagini: {
        fronte: '',
        retro: '',
        vari: [],
      },
    },
  });

  // Stato per le rate di pagamento aggiunte dinamicamente
  const [newPaymentValue, setNewPaymentValue] = useState('');
  const [newPaymentDueDate, setNewPaymentDueDate] = useState('');

  // Aggiunge una nuova rate di pagamento alla lista
  const handleAddPayment = () => {
    if (newPaymentValue !== '' && newPaymentDueDate !== '') {
      const newPayment = {
        valorerata: newPaymentValue,
        datascadenza: newPaymentDueDate,
        pagata: false // Inizialmente la rate non è pagata
      };
      setFormData(prevFormData => ({
        ...prevFormData,
        payments: {
          ...prevFormData.payments,
          rate: [...prevFormData.payments.rate, newPayment]
        }
      }));
      setNewPaymentValue('');
      setNewPaymentDueDate('');
    }
  };

  // Gestisce il cambiamento del valore della rate di pagamento
  const handlePaymentValueChange = (e) => {
    setNewPaymentValue(e.target.value);
  };

  // Gestisce il cambiamento della data di scadenza della rate di pagamento
  const handlePaymentDueDateChange = (e) => {
    setNewPaymentDueDate(e.target.value);
  };

  // Gestisce il cambiamento dei campi del form
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    const inputCategory = keys[0];
    const inputField = keys[keys.length - 1];

    setFormData((prevFormData) => {
      if (keys.length === 1) {
        // If no nesting, directly update the value
        return { ...prevFormData, [inputCategory]: value };
      } else if (keys.length === 2) {
        // If one level of nesting, update the nested object value
        return {
          ...prevFormData,
          [inputCategory]: { ...prevFormData[inputCategory], [inputField]: value },
        };
      } else {
        // If more than one level of nesting, update the deeply nested object value
        const updatedCategory = keys.reduce(
          (acc, key, index) =>
            index === keys.length - 1
              ? { ...acc, [key]: value }
              : { ...acc[key] },
          { ...prevFormData }
        );
        return { ...prevFormData, [inputCategory]: updatedCategory };
      }
    });
  };

  // Gestisce l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Effettua la chiamata POST utilizzando Axios
      const response = await axios.post(`http://127.0.0.1:2000/add/${type}`, formData);

      // Gestisci la risposta qui, ad esempio loggando la risposta
      console.log('Risposta API:', response.data);
      let id = response.data.data._id;
      var query = `/scheda/${type}/${id}`;
      redirectToHome(query);

      // Resetta il form o esegui altre azioni necessarie
    } catch (error) {
      // Gestisci gli errori qui, ad esempio loggando l'errore
      console.error('Errore API:', error);
    }
  };

    return  (
          <>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-5 p-3">
                <label>Aggiungi Studente</label>

                  <button type="submit">Invia Dati</button>
  
  
                  <label>Info</label>
  
                <div className="d-flex gap-3 form">
                    <h3>Nome</h3>
                    <input
                    type="text"
                    name="info.nome"
                    value={formData.info.nome}
                    onChange={handleInputChange}
                    />
                    <h3 className="">Secondo Nome</h3>
                    <input 
                      type="text"
                      name="info.secondo_nome"
                      value={formData.info.secondo_nome}
                      onChange={handleInputChange}
                    />
                    <h3 className="">Cognome</h3>
                    <input 
                   type="text"
                   name="info.cognome"
                   value={formData.info.cognome}
                   onChange={handleInputChange}
                    />
                    <h3 className="">Sesso</h3>
                    <input 
                   type="text"
                   name="info.sesso"
                   value={formData.info.sesso}
                   onChange={handleInputChange}
                    />
                </div>
                
                <div className="d-flex gap-3 form special">
                    <h3 className="">Data Nascita</h3>
                    <input className=""
                     type="date"
                     name="info.dob"
                     value={formData.info.dob}
                     onChange={handleInputChange}
                    />
                    
                    <div>
                    <p className="text-sm">*imposta formato DD-MM-YYYY <br/>(Esempio: 11-05-2001) per non avere problemi nel salvataggio </p>
                    </div>
                    <h3>Luogo Nascita</h3>
                    <input 
                       type="text"
                       name="info.lob"
                       value={formData.info.lob}
                       onChange={handleInputChange}
                    />
                    <select 
                    name="info.prob"
                    value={formData.info.prob}
                    onChange={handleInputChange} 
                    className="selector-width">
                        <option value="" disabled>Seleziona una provincia</option>
                        {province.map((province, index) => (
                          <option key={index} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                      
                      <h3>Stato</h3>
                      <select 
                      name="info.state"
                      value={formData.info.state}
                      onChange={handleInputChange} 
                      className="selector-width-state ">
                        <option value="" disabled>Seleziona uno Stato</option>
                        {paesiOrdinati.map((paese, index) => (
                          <option key={index} value={paese}>
                            {paese}
                          </option>
                        ))}
                      </select>
                </div>
  
                <div className="d-flex gap-3 form">
                    <h3 className="">Codice Fiscale</h3>
                    <input 
                       type="text"
                       name="info.cf"
                       value={formData.info.cf}
                       onChange={handleInputChange}
                       />
                    <h3 className="">Email</h3>
                      <input 
                         type="email"
                         name="info.email"
                         value={formData.info.email}
                         onChange={handleInputChange}/>
                      <h3 className="">Cellulare</h3>
                    <div className="d-flex gap-2">
                      <input 
                       type="text"
                       name="info.cellulare"
                       value={formData.info.cellulare}
                       onChange={handleInputChange}
                       />
                    </div>
                    
                </div>
                
  
                <div className="d-flex gap-5 form">
                          
                          <div className="d-flex flex-column gap-2">
                            <h3 className="">Indirizzo Residenza</h3>
                            <input 
                             type="text"
                             name="info.res"
                             value={formData.info.res}
                             onChange={handleInputChange}
                            />
                            <h3 className="">Città Residenza</h3>
                            <input    
                            type="text"
                             name="info.res_city"
                             value={formData.info.res_city}
                             onChange={handleInputChange}
                             />
                            <div className="d-flex gap-3">
                          
                              <div>
                                <h3 className="">Provincia</h3>
                                  <select 
                                  name="info.res_prov"
                                  value={formData.info.res_prov}
                                  onChange={handleInputChange} 
                                  className="selector-width">
                                  <option value="" disabled>Seleziona una provincia</option>
                                  {province.map((province, index) => (
                                    <option key={index} value={province}>
                                      {province}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <h3 className="">Stato</h3>
                                  <select 
                                    name="info.state_res"
                                    value={formData.info.state_res}
                                    onChange={handleInputChange} 
                                  className="selector-width-state ">
                                    <option value="" disabled>Seleziona uno Stato</option>
                                    {paesiOrdinati.map((paese, index) => (
                                      <option key={index} value={paese}>
                                        {paese}
                                      </option>
                                    ))}
                                  </select>
                              </div>
                            </div>
                            
  
                            
  
  
                          </div>
  
                          <div className="d-flex flex-column gap-2">
                            <h3 className="">Indirizzo Domciilio</h3>
                            <input 
                            type="text"
                            name="info.dom"
                            value={formData.info.dom}
                            onChange={handleInputChange}
                            />
                            <h3 className="">Città Domicilio</h3>
                            <input 
                            type="text"
                            name="info.dom_city"
                            value={formData.info.dom_city}
                            onChange={handleInputChange}
                            />
                            <div className="d-flex gap-3">
                           
                              <div>
                                <h3 className="">Provincia</h3>
                                  <select 
                                  name="info.dom_prov"
                                  value={formData.info.dom_prov}
                                  onChange={handleInputChange} 
                                  className="selector-width">
                                  <option value="" disabled>Seleziona una provincia</option>
                                  {province.map((province, index) => (
                                    <option key={index} value={province}>
                                      {province}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <h3 className="">Stato</h3>
                                  <select 
                                  name="info.state_dom"
                                  value={formData.info.state_dom}
                                  onChange={handleInputChange} 
                                  className="selector-width-state ">
                                    <option value="" disabled>Seleziona uno Stato</option>
                                    {paesiOrdinati.map((paese, index) => (
                                      <option key={index} value={paese}>
                                        {paese}
                                      </option>
                                    ))}
                                  </select>
                              </div>
                            </div>
                            
  
                            
  
  
                          </div>
  
                         </div>
                          {/* Sezione per aggiungere pagamenti */}
        <div className="d-flex flex-column gap-4 border border-dark rounded border-3 p-4">
          <h3>Pagamenti</h3>
          <div className="d-flex gap-2">
            <h3>Totali:</h3>
            <input
              type="text"
              name="payments.totale"
              value={formData.payments.totale}
              onChange={handleInputChange} />
          </div>
          <div className="d-flex gap-3">
            <div className="d-flex gap-2">
              <h3>Saldati:</h3>
              <input
                type="text"
                name="payments.saldati"
                value={formData.payments.saldati}
                onChange={handleInputChange}
                className="selector-width" />
            </div>
            <div className="d-flex gap-2">
              <h3>In Sospeso:</h3>
              <input
                type="text"
                name="payments.in_sospeso"
                value={formData.payments.in_sospeso}
                onChange={handleInputChange}
                className="selector-width" />
            </div>
          </div>

          {/* Sezione per aggiungere le rate di pagamento */}
          <div>
            <h3>Add Payment</h3>
            <div>
              <input
                type="text"
                placeholder="Value"
                value={newPaymentValue}
                onChange={handlePaymentValueChange}
              />
              <input
                type="date"
                value={newPaymentDueDate}
                onChange={handlePaymentDueDateChange}
              />
              <button type="button" onClick={handleAddPayment}>Add Payment</button>
            </div>
          </div>

          {/* Visualizza le rate di pagamento aggiunte */}
          <div>
            <h3>Added Payments</h3>
            <ul>
              {formData.payments.rate.map((payment, index) => (
                <li key={index}>
                  Value: {payment.valorerata}, Due Date: {payment.datascadenza}, Pagata: {payment.pagata ? 'Sì' : 'No'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
      <style jsx>{`
        .form h3 {
          font-size: 15px;
        }
        .form p {
          font-size: 10px;
        }
        .form input {
          height: 30px;
          border: 2px;
        }
        .form input special{
          width:100px
      
        }
        .selector-width {
          width: 70px;
          height: 30px;
        }

        .selector-width-state {
          width: 140px;
          height: 30px;
        }
      `}</style>
    </>
    )
  }
  
export default StudentAdd;