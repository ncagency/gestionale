'use client'
import Navbar from "../../components/Navbar";


const ManagerMenu = () => {
  const province = [
    "","AG", "AL", "AN", "AO", "AR", "AP", "AT", "AV", "BA", "BT", "BL", "BN", "BG", "BI", "BO", "BZ", "BS", "BR", "CA", "CL",
    "CB", "CI", "CE", "CT", "CZ", "CH", "CO", "CS", "CR", "KR", "CN", "EN", "FM", "FE", "FI", "FG", "FC", "FR", "GE", "GO",
    "GR", "IM", "IS", "AQ", "SP", "LT", "LE", "LC", "LI", "LO", "LU", "MC", "MN", "MS", "MT", "VS", "ME", "MI", "MO", "MB",
    "NA", "NO", "NU", "OG", "OT", "OR", "PD", "PA", "PR", "PV", "PG", "PU", "PE", "PC", "PI", "PT", "PN", "PZ", "PO", "RG",
    "RA", "RE", "RI", "RN", "RM", "RO", "SA", "VS", "SS", "SV", "SI", "SR", "SO", "TA", "TE", "TR", "TO", "OG", "TP", "TN",
    "TV", "TS", "UD", "VA", "VE", "VB", "VC", "VR", "VV", "VI", "VT"
  ];
  const paesi = ["Italia"]
  let paesiOrdinati = paesi.sort()

  console.log(paesi.length)
return (
    <div className="container-fluid d-flex flex-row">
      <Navbar />
      <div className="col-md-10 p-4">
            <div className="d-flex flex-column gap-5 p-3">
                <label>Add Student</label>


                <label>Info</label>

              <div className="d-flex gap-3 form">
                  <h3 className="">Nome</h3>
                  <input className=""/>
                  <h3 className="">Secondo Nome</h3>
                  <input className=""/>
                  <h3 className="">Cognome</h3>
                  <input className=""/>
              </div>
              
              <div className="d-flex gap-3 form">
                  <h3 className="">Data Nascita</h3>
                  <input className=""/>
                  <div>
                  <p className="text-sm">*imposta formato DD-MM-YYYY <br/>(Esempio: 11-05-2001) per non avere problemi nel salvataggio </p>
                  </div>
                  <h3>Luogo Nascita</h3>
                  <input />
                  <select className="selector-width">
                      <option value="" disabled>Seleziona una provincia</option>
                      {province.map((province, index) => (
                        <option key={index} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                    
                    <h3>Stato</h3>
                    <select className="selector-width-state ">
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
                  <input className=""/>
                  <h3 className="">Email</h3>
                    <input className=""/>
                    <h3 className="">Cellulare</h3>
                  <div className="d-flex gap-2">
                    <input className="selector-width"/>
                    <input className=""/>
                  </div>
                  
              </div>
              

              <div className="d-flex gap-5 form">
                               
                        <div className="d-flex flex-column gap-2">
                          <h3 className="">Indirizzo Residenza</h3>
                          <input className=""/>
                          <h3 className="">Città Residenza</h3>
                          <input className=""/>
                          <div className="d-flex gap-3">
                            <div>
                              <h3 className="">CAP</h3>
                              <input className="selector-width"/>
                            </div>
                            <div>
                              <h3 className="">Provincia</h3>
                                <select className="selector-width">
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
                                <select className="selector-width-state ">
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
                          <input className=""/>
                          <h3 className="">Città Domicilio</h3>
                          <input className=""/>
                          <div className="d-flex gap-3">
                            <div>
                              <h3 className="">CAP</h3>
                              <input className="selector-width"/>
                            </div>
                            <div>
                              <h3 className="">Provincia</h3>
                                <select className="selector-width">
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
                                <select className="selector-width-state ">
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
                                  <input className=""/>
                            </div>
                            <div className="d-flex gap-3">
                              <div className="d-flex gap-2">
                                    <h3>Saldati:</h3>
                                    <input className="selector-width"/>
                              </div>
                              <div className="d-flex gap-2">
                                    <h3>In Sospeso:</h3>
                                    <input className="selector-width"/>
                              </div>
                            
                            </div>
                        </div>

              </div>

              


            </div>
            
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