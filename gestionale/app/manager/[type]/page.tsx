'use client'
import Navbar from "../../components/Navbar";
import  { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";






const ManagerMenu = ({params})  => {
  
  let type = params.type

  const [formData, setFormData] = useState({
    info: {
      nome: '',
      secondo_nome: '',
      cognome: '',
      dob: '',
      lob: '',
      prob: '',
      state: '',
      cf: '',
      res: '',
      res_city:'', // AGGIUNGI SU SCHEDA
      res_prov:'',
      cap_res: 0,
      state_res:'',
      dom: '',
      dom_city: '', // AGGIUNGI SU SCHEDA
      dom_prov:'',
      cap_dom: 0,
      state_dom:'',
      prefix_cell: '', // selector
      cellulare: '',
      email: '',
    },
    payments: {
      totale: 0,
      saldati: 0,
      in_sospeso: 0,
    },
    courses_id: [],
    docs: {
      n_doc: '',
      l_doc: '', // selector
      city_doc: '',
      rilascio_doc: '',
      scadenza_doc: '',
      immagini: {
        fronte: '',
        retro: '',
        vari: [],
      },
    },
  });// CREA 4 COMPONENTI STUDENT ENTE CORSO E WORKER e ripeti questi comandi poi magari lo aggiusti
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      // Effettua la chiamata POST utilizzando Axios
      const response = await axios.post(`http://127.0.0.1:2000/add/${type}`, formData);
  
      // Gestisci la risposta qui, ad esempio loggando la risposta
      console.log('Risposta API:', response.data);
  
      // Resetta il form o esegui altre azioni necessarie
    } catch (error) {
      // Gestisci gli errori qui, ad esempio loggando l'errore
      console.error('Errore API:', error);
    }
  };
  

  
  const province = [
    "","AG", "AL", "AN", "AO", "AR", "AP", "AT", "AV", "BA", "BT", "BL", "BN", "BG", "BI", "BO", "BZ", "BS", "BR", "CA", "CL",
    "CB", "CI", "CE", "CT", "CZ", "CH", "CO", "CS", "CR", "KR", "CN", "EN", "FM", "FE", "FI", "FG", "FC", "FR", "GE", "GO",
    "GR", "IM", "IS", "AQ", "SP", "LT", "LE", "LC", "LI", "LO", "LU", "MC", "MN", "MS", "MT", "VS", "ME", "MI", "MO", "MB",
    "NA", "NO", "NU", "OG", "OT", "OR", "PD", "PA", "PR", "PV", "PG", "PU", "PE", "PC", "PI", "PT", "PN", "PZ", "PO", "RG",
    "RA", "RE", "RI", "RN", "RM", "RO", "SA", "VS", "SS", "SV", "SI", "SR", "SO", "TA", "TE", "TR", "TO", "OG", "TP", "TN",
    "TV", "TS", "UD", "VA", "VE", "VB", "VC", "VR", "VV", "VI", "VT"
  ];
  const paesiOrdinati = ["Italia"]
  

return (
    <div className="container-fluid d-flex flex-row">
      <Navbar />
      <div className="col-md-10 p-4">
        <Link  href="/manager"><p>Indietro</p></Link>
            
            
            creai componenti separati e pace
            <form  onSubmit={handleSubmit} className="d-flex flex-column gap-5 p-3">
                <label>Add Student</label>
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
              </div>
              
              <div className="d-flex gap-3 form">
                  <h3 className="">Data Nascita</h3>
                  <input 
                   type="text"
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
                    <input  type="text"
                       name="info.prefix_cell"
                       value={formData.info.prefix_cell}
                       onChange={handleInputChange}
                       className="selector-width"/>
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
                              <h3 className="">CAP</h3>
                              <input 
                              type="text"
                              name="info.cap_res"
                              value={formData.info.cap_res}
                              onChange={handleInputChange}
                              className="selector-width"/>
                            </div>
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
                              <h3 className="">CAP</h3>
                              <input 
                              type="text"
                              name="info.cap_dom"
                              value={formData.info.cap_dom}
                              onChange={handleInputChange}
                              className="selector-width"/>
                            </div>
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

                        <div className="d-flex flex-column gap-4 border border-dark rounded border-3 p-4">
                            <h3>Pagamenti</h3>
                            <div className="d-flex gap-2">
                                  <h3>Totali:</h3>
                                  <input type="text"
                  name="payments.totale"
                  value={formData.payments.totale}
                  onChange={handleInputChange}/>
                            </div>
                            <div className="d-flex gap-3">
                              <div className="d-flex gap-2">
                                    <h3>Saldati:</h3>
                                    <input 
                                    type="text"
                           name="payments.saldati"
                           value={formData.payments.saldati}
                           onChange={handleInputChange}
                           className="selector-width"/>
                              </div>
                              <div className="d-flex gap-2">
                                    <h3>In Sospeso:</h3>
                                    <input 
                                              type="text"
                                              name="payments.in_sospeso"
                                              value={formData.payments.in_sospeso}
                                              onChange={handleInputChange}
                                    className="selector-width"/>
                              </div>
                            
                            </div>
                        </div>

              </div>

              


            </form>
            
      </div>

      <style jsx>{`
        
        .form h3{
          font-size:15px
        }
        .form p{
          font-size:10px;
        }
        .form input {
          height: 30px;
          border: 2px;
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
    </div>
  );
};

export default ManagerMenu