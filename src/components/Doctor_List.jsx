import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/material";
//import CommentIcon from '@mui/icons-material/Comment';
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const Doctor_List = () => {
  const navigate = useNavigate();

  const [names, setname] = useState([]);
  const patientname = localStorage.getItem("patientname", "****");
  const hospitalname = localStorage.getItem("hospitalname", "****");
  const [loading, setLoading] = useState(true);

  const handleSignup = async (username) => {
    const response = await axios
      .get(`http://localhost:3000/doctorlist?search=${hospitalname}`)
      .then((response) => {

        let arr = response.data;
        setLoading(false);

        setname(arr);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const assignappoint = async (username) => {
    const response = await axios
      .get(
        `https://hospital-backend-2ox9.onrender.com/appointment?param1=${username}&param2=${patientname}`
      )
      .then((response) => {
        console.log(response.data);
        let arr = response.data;

        setname(arr);
      });
  };
  useEffect(() => {
    handleSignup();
  }, []);
  return (
    <>
      <h1 className="head2">Doctors Avaliable</h1>
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
                  <Box>
                  <IconButton aria-label="comment">
                    <AddCircleOutlineIcon   onClick={() => {
                      assignappoint(item.username), navigate(-1);
                    }}/>
                  </IconButton>
                  </Box>
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
    </>
  );
};
