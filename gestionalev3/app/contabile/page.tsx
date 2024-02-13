import React from 'react'




const Contabile = () => {
  return (
    <div className='h-100'>
            <div className='text-primary fs-4'>
                <p>Indietro</p>

            </div>
            
            <div className='d-flex gap-1 h-25'>
                <div className='flex-column bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Totale</p>
                   <p className='fs-1 text-white'>10.0000</p>
                </div>
                <div className='flex-column bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Entrate</p>
                   <p className='fs-1 text-white'>10.0000</p>
                </div>
                <div className='flex-column bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Uscite</p>
                   <p className='fs-1 text-white'>10.0000</p>
                </div>
                <div className='flex-column bg-primary w-25 h-100 rounded-3 p-3'>
                   <p className='fs-4 text-white'>Profit</p>
                   <p className='fs-1 text-white'>10.0000</p>
                </div>
            
            </div>


    </div>
  )
}

export default Contabile