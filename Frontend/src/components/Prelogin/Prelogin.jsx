import React from "react";
import "./Prelogin.css";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../Appbar/Appbar";
import { Aboutus, Footer } from "../LandingPage/Landing";

export const Prelogin = () => {
  const navigate = useNavigate();

  return (
    <>
      <Appbar />
      <div className="prelogin">
        <Grid container justifyContent={"center"} spacing={6}>
          <Grid item lg={4} md={7} sm={7}>
            <div className="userprelogin">
              <h1>For Learners</h1>
              <span>Purchase courses and upskill</span>
              <span>yourself by learning </span>
              <span>from industry experts.</span>
              <div>
                <button
                  onClick={() => {
                    navigate("/users/login");
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/users/signup");
                  }}
                >
                  Signup
                </button>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={7} sm={7}>
            <div className="adminprelogin">
              <h1>For Educators</h1>
              <span>Showcase your teaching skills</span>
              <span>and spread your knowledge by</span>
              <span>publishing your own course.</span>
              <div>
                <button
                  onClick={() => {
                    navigate("/admin/login");
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/admin/signup");
                  }}
                >
                  Signup
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <Aboutus />
      <Footer />
    </>
  );
};
