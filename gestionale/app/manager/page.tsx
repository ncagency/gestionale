import Navbar from "../components/Navbar";


const ManagerMenu = () => {
return (
    <div className="container-fluid d-flex flex-row">
      <Navbar />
      <div className="col-md-10 p-4">
            <div>Aggiungi</div>
            <p>Studente</p>
            <p>Lavoratore</p>
            <p>Corso</p>
            <p>Ente</p>
      </div>
    </div>
  );
};

export default ManagerMenu