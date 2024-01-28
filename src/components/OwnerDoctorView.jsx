import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';

export const Doctor_List = () => {
  const navigate=useNavigate();
    
    const [names,setname] = useState([]);
    const patientname=localStorage.getItem('patientname',"****");
    const hospitalname=localStorage.getItem('hospitalname',"****");
    const [loading, setLoading] = useState(true);
   
    const handleSignup = async (username) => {
  
        const response = await axios.get(`http://localhost:3000/doctorlist?search=${hospitalname}`).then((response) => {
          console.log(response.data);
          let arr=response.data;
          setLoading(false);

        
          setname(arr);
        
  
        }).catch((error) => { 
          setLoading(false);
        });
      }
      const assignappoint = async (username) => {
  
        const response = await axios.get(`http://localhost:3000/appointment?param1=${username}&param2=${patientname}`).then((response) => {
          console.log(response.data);
          let arr=response.data;
        
          setname(arr);
        
  
        });
      }
      useEffect(()=>{
        handleSignup();
      },[])
  return (<>
    <h1 className='head2'>Doctors Avaliable</h1>
    {loading?(<SpinnerDotted className='loading'/>):(
      <div >
        <div >
        <ol className='content'>
        {names.map((item,index) => (
          
          <li key={index }>
            <div className='inrow'>
            <button className="btn4" onClick={()=>{assignappoint(item.username),navigate(-1)}}>

              <h2 >{item.username}</h2> click to request for appointment</button>
              
            </div>

              </li>
              
        ))}
      </ol>
        </div>
      </div>
     
    )

    }
  
  

  
 
    </>
  
  )
}
