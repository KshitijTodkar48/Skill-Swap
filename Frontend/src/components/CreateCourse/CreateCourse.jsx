import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./CreateCourse.css";
import { Appbar } from "../Appbar/Appbar";

export const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");

  const handleCreateCourse = () => {
    if (!title || !description || !price || !imageLink) {
      alert("Please fill all the fields.");
      return;
    }
    fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("admintoken"),
      },
      body: JSON.stringify({
        title,
        description,
        price,
        imageLink,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.message);
      });
  };

  return (
    <>
      <Appbar />
      <div className="createCourse">
        <div className="createCoursecard">
          <h1>Publish a Course</h1>
          <TextField
            margin="normal"
            label="Title"
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            label="Description"
            variant="outlined"
            inputProps={{ maxLength: 300 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            label="Price"
            variant="outlined"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            label="Image URL"
            variant="outlined"
            onChange={(e) => {
              setImageLink(e.target.value);
            }}
          />

          <div className="btn">
            <Button
              variant="contained"
              onClick={() => {
                handleCreateCourse();
              }}
            >
              Create course
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
