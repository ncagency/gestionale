import Link from 'next/link';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';


export default function Home() {
  return (
    <main className='container-fluid d-flex flex-row'>
      <Navbar />
      <div className='col-md-10 p-4'>
        <Dashboard />
      </div>
    </main>
  )
}
