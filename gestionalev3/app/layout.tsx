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
    background: "linear-gradient(to right, #ffffff, #f2f2f2)",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Funzione per gestire il login dell'utente
  const handleLogin = () => {
    console.log("Logged")
    setIsLoggedIn(true);
  };

  // Se l'utente non è autenticato, mostra la pagina di login
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body className={inter.className} style={style}>
        <Navbar /> 
        <div style={{ marginLeft: "30px", width: "calc(100% - 200px)", padding:'20px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
