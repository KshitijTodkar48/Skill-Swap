import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Grid, Box, LinearProgress } from "@mui/material";
import "./EditCourse.css";
import { Appbar } from "../Appbar/Appbar";

export const EditCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/admin/courses/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("admintoken"),
      },
    }).then((response) =>
      response.json().then((data) => {
        setCourse(data.course);
      })
    );
  }, []);

  if (!course) {
    return (
      <div
        style={{
          display: "flex",
          height: "90vh",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "90%" }}>
          <LinearProgress />
        </Box>
      </div>
    );
  }

  return (
    <>
      <Appbar />
      <div className="editcourse">
        <Grid container justifyContent={"center"}>
          <Grid item lg={3.5} md={5} sm={7} xs={10}>
            <CourseCard course={course} />
          </Grid>
          <Grid item lg={5} md={8} sm={10} xs={10}>
            <Editform course={course} setCourse={setCourse} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

function CourseCard(props) {
  return (
    <div className="editcourseCard">
      <div className="editimage">
        <img src={props.course.imageLink} alt="" />
      </div>
      <div className="edittitle">{props.course.title}</div>
      <div className="editdescription">{props.course.description}</div>
      <div className="editprice">Price: {props.course.price} INR</div>
    </div>
  );
}

function Editform({ course, setCourse }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [imageLink, setImageLink] = useState(course.imageLink);

  const handleEditCourse = () => {
    const editedCourse = {
      _id: course._id,
      title,
      description,
      price,
      imageLink,
    };
    fetch(`http://localhost:3000/admin/courses/${course._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("admintoken"),
      },
      body: JSON.stringify(editedCourse),
    }).then((response) =>
      response.json().then((data) => {
        setCourse(editedCourse);
        alert(data.message);
      })
    );
  };

  return (
    <div className="editCoursecard">
      <h1>Edit Course</h1>
      <TextField
        value={title}
        margin="normal"
        label="Title"
        variant="outlined"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <TextField
        value={description}
        margin="normal"
        label="Description"
        variant="outlined"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        inputProps={{ maxLength: 300 }}
      />
      <TextField
        value={price}
        margin="normal"
        label="Price"
        variant="outlined"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <TextField
        value={imageLink}
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
            handleEditCourse();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
