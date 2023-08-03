import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../UserCourses/UserCourses.css";
import { Appbar } from "../Appbar/Appbar";

export const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("admintoken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((courseObject) => {
        console.log(courseObject);
        setCourses(courseObject.courses);
      });
  }, []);

  return (
    <>
      <Appbar />
      <div className="courses">
        {courses.map((course) => {
          return (
            <div key={course._id} className="courseCard">
              <div className="image">
                <img src={course.imageLink} alt="" />
              </div>
              <div className="title">{course.title}</div>
              <div className="description">{course.description}</div>
              <div className="price">Price: {course.price} INR</div>
              <button
                className="button"
                onClick={() => {
                  navigate(`/courses/${course._id}`);
                }}
              >
                Edit Course
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
