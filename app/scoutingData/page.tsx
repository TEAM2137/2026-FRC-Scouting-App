'use client';
import { useState } from 'react';

export default function PostMatch() {
  const[openmatch, setopenmatch] = useState(1)
    const stuff =() => {
        setopenmatch(openmatch + 1)
    }
    const testClick =() => {
        setopenmatch(openmatch - 1)
    }
    
    return (<div className="pt-10 w-screen">
        <div className='bg-blue-500 text-white p-4 rounded-lg text-center '>Scouting data page</div>
   
   
   
   
   
   
   <div className="grid grid-cols-4 gap-5 mt-4">
    <div onClick={stuff} className='flex bg-blue-500 text-white p-6 rounded-lg auto-w-30 auto-h-5 max-w-40  z-0 '><h1 className=' '>Match 1</h1> </div>
    <div onClick={testClick} className='flex bg-blue-500 text-white p-6 rounded-lg auto-w-30 auto-h-5 max-w-40 z-0 '><h1 className=' '>Match 2</h1> </div>
    <div onClick={testClick} className='flex bg-blue-500 text-white p-6 rounded-lg auto-w-30 auto-h-5 max-w-40 z-0 '><h1 className=' '>Match 3</h1> </div>
    <div onClick={testClick} className='flex bg-blue-500 text-white p-6 rounded-lg auto-w-30 auto-h-5 max-w-40 z-0 '><h1 className=' '>Match 4</h1> </div>
    <div onClick={testClick} className='flex bg-blue-500 text-white p-6 rounded-lg auto-w-30 auto-h-5 max-w-40 z-0 '><h1 className=' '>Match 5</h1> </div>
    <div onClick={testClick} className='flex bg-blue-500 text-white p-6 rounded-lg auto-w-30 auto-h-5 max-w-40 z-0 '><h1 className=' '>Match 6</h1> </div>   
    <div onClick={testClick} className='flex bg-blue-500 text-white p-6 rounded-lg auto-w-30 auto-h-5 max-w-40 z-0 '><h1 className=' '>Match 7</h1> </div>
    <div onClick={testClick} className='flex bg-blue-500 text-white p-6 rounded-lg auto-w-30 auto-h-5 max-w-40 z-0 '><h1 className=' '>Match 8</h1> </div>




    </div>
    </div>)
}
