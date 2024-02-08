'use client' 
import Link from "next/link";



const redirect = (query:string) => {
  const destinationValue = `/${query}`;
  window.location.href = destinationValue;
}

const Ente = () => {
  let query = "aggiungi/enti";
  const handleRedirect = () => {
      redirect(query);
  }
  return (
      <div onClick={handleRedirect} style={{ cursor: 'pointer' }} className='bg-warning p-5 fs-1 d-flex flex-column h-100 justify-content-center align-items-center rounded-4'> {/* INSERISCI UNA FUNZIONE CHE AL CLICK REINDIRIZZI NELLA PAGINA DI ADD*/}
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
              <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
              <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
      </svg>
    
    </div>
  );
};


const Worker = () => {

  let query = "aggiungi/workers";
  const handleRedirect = () => {
      redirect(query);
  }
  return (
      <div onClick={handleRedirect} style={{ cursor: 'pointer' }} className='bg-warning p-5 fs-1 d-flex flex-column h-100 justify-content-center align-items-center rounded-4'> {/* INSERISCI UNA FUNZIONE CHE AL CLICK REINDIRIZZI NELLA PAGINA DI ADD*/}
         <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-workspace" viewBox="0 0 16 16">
          <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
          </svg>
    
    </div>
  );
};

const Corso = () => {
  let query = "aggiungi/courses";
  const handleRedirect = () => {
      redirect(query);
  }
  return (
      <div  onClick={handleRedirect} style={{ cursor: 'pointer' }} className='bg-warning p-5 fs-1 d-flex flex-column h-100 justify-content-center align-items-center rounded-4'> {/* INSERISCI UNA FUNZIONE CHE AL CLICK REINDIRIZZI NELLA PAGINA DI ADD*/}
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                  <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
                  <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
          </svg>
    
    </div>
  );
};

const Studente = () => {
  let query = "aggiungi/students";
  const handleRedirect = () => {
      redirect(query);
  }
  return (
    <div  onClick={handleRedirect} style={{ cursor: 'pointer' }} className='bg-warning p-5 fs-1 d-flex flex-column h-100 justify-content-center align-items-center rounded-4'> {/* INSERISCI UNA FUNZIONE CHE AL CLICK REINDIRIZZI NELLA PAGINA DI ADD*/}
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
              <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
              </svg>
    
    </div>
  );
};


const Menu = () => {
return (
  <div className="col-md-10 p-4">
        <Link  href="/"><p>Indietro</p></Link>

      <div className="d-flex flex-column align-items-center mt-3 gap-5">
              <h1 className="fs-1">Aggiungi</h1>
              <div className=" d-flex gap-5">
                  <Studente />
                  <Worker />
              </div>
              <div className=" d-flex gap-5">
                  <Ente />
                  <Corso />
              </div>
      </div>
  </div>
  );
};

export default Menu