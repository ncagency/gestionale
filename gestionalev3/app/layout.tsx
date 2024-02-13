'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '@/components';
import Login from "@/components/Login";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

 const style = { 
  display: "flex", 
  flexDirection: "row",
  background: "linear-gradient(to right, #ffffff, #f2f2f2)",
};


const [isLoggedIn, setIsLoggedIn] = useState(true);

// Funzione per gestire il login dell'utente
const handleLogin = () => {
  // Qui dovresti implementare la logica di autenticazione, ad esempio, chiamando un'API, controllando i dati nel localStorage, ecc.
  // Se l'utente è autenticato con successo, imposta isLoggedIn su true.
  setIsLoggedIn(true);
};

// Funzione per gestire il logout dell'utente
const handleLogout = () => {
  // Qui dovresti implementare la logica di logout, ad esempio, cancellando i dati dal localStorage, ecc.
  // Dopo il logout, imposta isLoggedIn su false.
  setIsLoggedIn(false);
};

// Se l'utente non è autenticato, mostra la pagina di login
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

 

  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className} style={style}>
        <Navbar style={{ position: "fixed", left: 0, top: 0, height: "100vh" }} />
        <div style={{ marginLeft: "30px", width: "calc(100% - 200px)", padding:'20px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
