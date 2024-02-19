'use client'
import { useState,useEffect } from 'react';
import axios from 'axios';

const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"






function setWorkerIdToCookie(workerId:any) {
  document.cookie = `workerId=${workerId}; path=/; max-age=7200`; // Imposta il cookie con il nome "workerId" e una durata di 3600 secondi (1 ora)
}

// Funzione per ottenere l'ID del worker dai cookie
export function getWorkerIdFromCookie() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'workerId') {
      return value;
    }
  }
  return null;
}


export default function Login({ onLogin }:{ onLogin:any }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Verifica se l'utente è già autenticato al caricamento della pagina
    const token = getWorkerIdFromCookie(); // Funzione per ottenere il token dai cookie
    if (token) {
      // Se l'utente è già autenticato, esegui il login automatico
      onLogin();
    }
  }, []); // L'effetto viene eseguito solo al caricamento iniziale

  // Funzione per gestire il submit del modulo di login
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Effettua una richiesta al backend per verificare le credenziali dell'utente
      const response = await axios.post(`${apiURL}/login`, {
        username,
        password
      });

      // Se la risposta è positiva, chiama la funzione di callback onLogin per eseguire l'accesso
      if (response.data.success) {
        setWorkerIdToCookie(response.data.workerId);
        onLogin();
      } else {
        setError('Username or password is incorrect.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form className="d-flex flex-column gap-2" onSubmit={handleSubmit} style={{ width: '300px', textAlign: 'center' }}>
        <h2>Accedi</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='m-4'>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}


