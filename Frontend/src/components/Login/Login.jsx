import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { Aboutus, Footer } from "../LandingPage/Landing";
import { Appbar } from "../Appbar/Appbar";

export const Login = () => {
  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = () => {
    if(!username || !password)
    {
      alert("Please enter both the fields.");
      return;
    }
    fetch(`http://localhost:3000/users/login` , {
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
        localStorage.setItem("usertoken",data.token);
        navigate(`/users/courses`);
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
            <Link to="/users/signup"> Signup</Link>
          </div>
        </div>
      </div>
    </div>
    <Aboutus />
    <Footer />
    </>
  );
};
