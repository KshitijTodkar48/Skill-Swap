import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { Appbar } from "../Appbar/Appbar";
import { Aboutus, Footer } from "../LandingPage/Landing";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = () => {
    if(!username || !password)
    {
      alert("Please enter both the fields.");
      return;
    }
    fetch(`http://localhost:3000/admin/login` , {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then( res => {
      return res.json();
    }).then( data => {
      alert(data.message);
      if(data.token)
      {
        localStorage.setItem("admintoken",data.token);
        navigate(`/admin/courses`);
      }
    })
  }

  return (
    <>
    <Appbar />
    <div className="login">
      <div className="card">
        <h1>Login</h1>
        <TextField
          margin="normal"
          label="Username"
          variant="outlined"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          type="password"
          margin="normal"
          label="Password"
          variant="outlined"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <div className="btn">
          <Button variant="contained" onClick={() => {handleLogin()}}>Login</Button>
          <div>
             Don't have an account ?
            <Link to="/admin/signup"> Signup</Link>
          </div>
        </div>
      </div>
    </div>
    <Aboutus />
    <Footer />
    </>
  );
};
