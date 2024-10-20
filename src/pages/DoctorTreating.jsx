import React, { useEffect, useState } from "react";
import { SpinnerDotted } from "spinners-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
//import CommentIcon from '@mui/icons-material/Comment';
import IconButton from "@mui/material/IconButton";
import ChatIcon from '@mui/icons-material/Chat';
export const DoctorTreating = () => {
  const navigate = useNavigate();
  const [names, setname] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleSignup = async () => {
    const patientname = localStorage.getItem("patientname", "****");
    const response = await axios
      .get(`https://hospital-backend-2ox9.onrender.com/doctortreating?search=${patientname}`)
      .then((response) => {
        let arr = response.data;
        setLoading(false);

        setname(arr);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    handleSignup();
  }, []);

  return (
    <>
      <h1 className="head2">My Doctors</h1>
      <div className="">
        {loading ? (
          <SpinnerDotted className="loading" />
        ) : (
          
           <div className="flex justify-center">
           <List
             className="flex flex-col m-5 "
             sx={{ width: "100%", maxWidth: 360, bgcolor: "", mb: 2 }}
           >
             {names.map((item, index) => (
               <ListItem
                 sx={{
                   mb: 2,
                   p: 2,
                   bgcolor: "lightcyan", 
                   borderRadius: '8px',
             
                 }}
                 key={index}
                 disableGutters
                 secondaryAction={
                   <IconButton aria-label="comment">
                     <ChatIcon  onClick={() => navigate(`/chat/${item.username}`)}/>
                   </IconButton>
                 }
               >
                 <ListItemText
                   primary={`Dr. ${item.username}`}
                   secondary={`${item.speciality}`}
                 />
               </ListItem>
             ))}
           </List>
         </div>
        )}
      </div>
    </>
  );
};
