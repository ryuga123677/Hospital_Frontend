import React from 'react'
import { useState,useEffect } from 'react';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';

export const Performance = () => {
    const [perform,setperform] = useState('');
    const doctorname=localStorage.getItem('doctorname',"****");
    const [loading, setLoading] = useState(true);
    const handlelist = async () => {
  
        const response = await axios.get(`https://hospital-backend-2ox9.onrender.com/performance?search=${doctorname}`).then((response) => {
        
          let length=response.data;
          setLoading(false);

    
         setperform(length);
        
        
  
        }).catch((error) => { 
          setLoading(false);
        });
      }
      useEffect(() => {
        handlelist();
      },[]);
  return (
    <>
    <h1 className='head2'>Performance</h1>
    {loading?(<SpinnerDotted className='loading'/>):
    (<div className='flex justify-center items-center mt-10'><h1 className=''>Success Rate-{perform*100}%</h1></div>)}
    </>
    

  )
}
