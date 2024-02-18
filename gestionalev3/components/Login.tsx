'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }:{ onLogin:any }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Funzione per gestire il submit del modulo di login
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Effettua una richiesta al backend per verificare le credenziali dell'utente
      const response = await axios.post('/login', {
        username,
        password
      });

      // Se la risposta è positiva, chiama la funzione di callback onLogin per eseguire l'accesso
      if (response.data.success) {
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


