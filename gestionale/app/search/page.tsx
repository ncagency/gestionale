import Navbar from "../components/Navbar"
import Search_Users from "../components/Search"

const students = [
  {
    _id: 38199209,
    info: {
      nome: "Luca",
      secondo_nome: "Jr",
      cognome: "Valori",
      dob: "25-05-2001",
      lob: "Benevento",
      prob: "BN",
      capb: 82100,
      state: "Italy",
      cf: "LVHS01MSHWU12",
      res: "Via Avellino 28",
      cap_res: 82100,
      dom: "Via Avellino 28",
      cap_dom: 82100,
      prefix_cell: "+39",
      cellulare: "3662731403",
      email: "gerardo.dagostino12@gmail.com",
    },
    payments: {
      totale: 3500,
      inviati: 2000,
      da_dare: 0,
    },
    courses_id: [77764555, 29388899],
    docs: {
      n_doc: "CA1177899",
      l_doc: "COMUNE",
      city_doc: "Benevento",
      rilascio_doc: "22-01-2023",
      scadenza_doc: "25-05-2033",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38199210,
    info: {
      nome: "Big",
      cognome: "Luca",
      dob: "25-05-1998",
      lob: "Benevento",
      prob: "BN",
      capb: 82100,
      state: "Italy",
      cf: "LVHS01MSHWU12",
      res: "Via Avellino 28",
      cap_res: 82100,
      dom: "Via Avellino 28",
      cap_dom: 82100,
      prefix_cell: "+39",
      cellulare: "3662731403",
      email: "gerardo.dagostino12@gmail.com",
    },
    payments: {
      totale: 3500,
      inviati: 2000,
      da_dare: 0,
    },
    courses_id: [29348899],
    docs: {
      n_doc: "CA1177899",
      l_doc: "COMUNE",
      city_doc: "Benevento",
      rilascio_doc: "22-01-2023",
      scadenza_doc: "25-05-2033",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38200987,
    info: {
      nome: "Giovanni",
      secondo_nome: "Antonio",
      cognome: "Ferrari",
      dob: "10-12-1995",
      lob: "Milano",
      prob: "MI",
      capb: 20100,
      state: "Italy",
      cf: "GFHS01GNRAO95",
      res: "Via Torino 55",
      cap_res: 20100,
      dom: "Via Milano 30",
      cap_dom: 20100,
      prefix_cell: "+39",
      cellulare: "3339876543",
      email: "giovanni.ferrari@example.com",
    },
    payments: {
      totale: 3000,
      inviati: 1500,
      da_dare: 1500,
    },
    courses_id: [99998888],
    docs: {
      n_doc: "PA123456",
      l_doc: "COMUNE",
      city_doc: "Milano",
      rilascio_doc: "05-06-2018",
      scadenza_doc: "10-12-2028",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38201234,
    info: {
      nome: "Anna",
      secondo_nome: "Maria",
      cognome: "Rossi",
      dob: "15-08-1997",
      lob: "Napoli",
      prob: "NA",
      capb: 80100,
      state: "Italy",
      cf: "RSSNMA97M41H501I",
      res: "Via Vesuvio 10",
      cap_res: 80100,
      dom: "Via Napoli 5",
      cap_dom: 80100,
      prefix_cell: "+39",
      cellulare: "3456789012",
      email: "anna.rossi@example.com",
    },
    payments: {
      totale: 2800,
      inviati: 1800,
      da_dare: 1000,
    },
    courses_id: [77764555, 88887777],
    docs: {
      n_doc: "ID876543",
      l_doc: "COMUNE",
      city_doc: "Napoli",
      rilascio_doc: "10-04-2016",
      scadenza_doc: "15-08-2026",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38203456,
    info: {
      nome: "Francesco",
      secondo_nome: "Giuseppe",
      cognome: "Bianchi",
      dob: "02-03-1994",
      lob: "Roma",
      prob: "RM",
      capb: 10100,
      state: "Italy",
      cf: "BNCFRZ94H02H501C",
      res: "Via Roma 15",
      cap_res: 10100,
      dom: "Via Napoli 8",
      cap_dom: 10100,
      prefix_cell: "+39",
      cellulare: "3337654321",
      email: "francesco.bianchi@example.com",
    },
    payments: {
      totale: 3200,
      inviati: 2000,
      da_dare: 1200,
    },
    courses_id: [77764555],
    docs: {
      n_doc: "DL345678",
      l_doc: "COMUNE",
      city_doc: "Roma",
      rilascio_doc: "18-09-2013",
      scadenza_doc: "02-03-2023",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38204567,
    info: {
      nome: "Elena",
      secondo_nome: "Maria",
      cognome: "De Luca",
      dob: "12-07-2002",
      lob: "Palermo",
      prob: "PA",
      capb: 90100,
      state: "Italy",
      cf: "DLNMRE02L12H501F",
      res: "Via Palermo 22",
      cap_res: 90100,
      dom: "Via Messina 14",
      cap_dom: 90100,
      prefix_cell: "+39",
      cellulare: "3498765432",
      email: "elena.deluca@example.com",
    },
    payments: {
      totale: 2800,
      inviati: 1600,
      da_dare: 1200,
    },
    courses_id: [99998888, 29388899],
    docs: {
      n_doc: "ID543210",
      l_doc: "COMUNE",
      city_doc: "Palermo",
      rilascio_doc: "05-11-2019",
      scadenza_doc: "12-07-2029",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38205678,
    info: {
      nome: "Marco",
      secondo_nome: "Antonio",
      cognome: "Galli",
      dob: "08-04-1998",
      lob: "Milano",
      prob: "MI",
      capb: 20100,
      state: "Italy",
      cf: "MRCANT98D08H501K",
      res: "Via Milano 18",
      cap_res: 20100,
      dom: "Via Torino 7",
      cap_dom: 20100,
      prefix_cell: "+39",
      cellulare: "3331234567",
      email: "marco.galli@example.com",
    },
    payments: {
      totale: 3400,
      inviati: 2200,
      da_dare: 1200,
    },
    courses_id: [77764555, 88887777],
    docs: {
      n_doc: "DL987654",
      l_doc: "MOTORIZZAZIONE",
      city_doc: "Milano",
      rilascio_doc: "15-09-2016",
      scadenza_doc: "08-04-2026",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38203456,
    info: {
      nome: "Francesco",
      secondo_nome: "Giuseppe",
      cognome: "Bianchi",
      dob: "02-03-1994",
      lob: "Roma",
      prob: "RM",
      capb: 10100,
      state: "Italy",
      cf: "BNCFRZ94H02H501C",
      res: "Via Roma 15",
      cap_res: 10100,
      dom: "Via Napoli 8",
      cap_dom: 10100,
      prefix_cell: "+39",
      cellulare: "3337654321",
      email: "francesco.bianchi@example.com",
    },
    payments: {
      totale: 3200,
      inviati: 2000,
      da_dare: 1200,
    },
    courses_id: [77764555],
    docs: {
      n_doc: "DL345678",
      l_doc: "COMUNE",
      city_doc: "Roma",
      rilascio_doc: "18-09-2013",
      scadenza_doc: "02-03-2023",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38204567,
    info: {
      nome: "Elena",
      secondo_nome: "Maria",
      cognome: "De Luca",
      dob: "12-07-2002",
      lob: "Palermo",
      prob: "PA",
      capb: 90100,
      state: "Italy",
      cf: "DLNMRE02L12H501F",
      res: "Via Palermo 22",
      cap_res: 90100,
      dom: "Via Messina 14",
      cap_dom: 90100,
      prefix_cell: "+39",
      cellulare: "3498765432",
      email: "elena.deluca@example.com",
    },
    payments: {
      totale: 2800,
      inviati: 1600,
      da_dare: 1200,
    },
    courses_id: [99998888, 29388899],
    docs: {
      n_doc: "ID543210",
      l_doc: "COMUNE",
      city_doc: "Palermo",
      rilascio_doc: "05-11-2019",
      scadenza_doc: "12-07-2029",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  },
  {
    _id: 38205678,
    info: {
      nome: "Marco",
      secondo_nome: "Antonio",
      cognome: "Galli",
      dob: "08-04-1998",
      lob: "Milano",
      prob: "MI",
      capb: 20100,
      state: "Italy",
      cf: "MRCANT98D08H501K",
      res: "Via Milano 18",
      cap_res: 20100,
      dom: "Via Torino 7",
      cap_dom: 20100,
      prefix_cell: "+39",
      cellulare: "3331234567",
      email: "marco.galli@example.com",
    },
    payments: {
      totale: 3400,
      inviati: 2200,
      da_dare: 1200,
    },
    courses_id: [77764555, 88887777],
    docs: {
      n_doc: "DL987654",
      l_doc: "MOTORIZZAZIONE",
      city_doc: "Milano",
      rilascio_doc: "15-09-2016",
      scadenza_doc: "08-04-2026",
      immagini: {
        path: "",
        fronte: "",
        retro: "",
        vari_doc: [{ path: "" }],
      },
    },
  }
  

  
  
];
const workers = [
  {
  _id: 198328983,
  info: {
      nome: "Mario",
      secondo_nome: "",
      cognome: "Merola",
      dob: "10-10-1998", //data di nascita
      lob: "Roma", //luogo di nascita
      prob: "RM", //provincia di nascita
      capb: "00139", // cap luogo nascita
      state: "Italy", //stato di nascita
      cf: "ACACASBUACACASBU",  //codice fiscale
      res: "Via delle Vie", //indirizzo residenza
      cap_res: "00139", //CAP RESIDENZA
      dom: "Via delle Vie", //indirizzo domicilio
      cap_dom: "00139", // CAP DOMICILIO
      prefix_cell: "+39",
      cellulare: "3333333333",
      email: "mail@gmai.com",
    },
    permessi:{
      p1:"string"
    }
  }
];

export default function Search_Page() {
    let type="students"

    return (
      <main className="container-fluid d-flex flex-row">
        <Navbar />
        <div className="col-md-10 p-4">
            <Search_Users category={students} type={type}/>
        </div>
      </main>
    )
  }
  