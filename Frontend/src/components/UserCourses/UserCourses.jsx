import React, { useState, useEffect } from "react";
import "./UserCourses.css";
import { useRecoilValue } from "recoil";
import { loginState } from "../GlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Appbar } from "../Appbar/Appbar";

export const UserCourses = () => {
  const isUserLoggedin = useRecoilValue(loginState);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users/courses")
      .then((response) => {
        return response.json();
      })
      .then((courseObject) => {
        setCourses(courseObject.courses);
      });
  }, []);

  const handleBuyCourse = (courseId) => {
    if (!isUserLoggedin.user) {
      alert("Please Login/Signup before buying.");
      navigate("/users/login");
      return;
    }
    axios
      .post(`http://localhost:3000/users/courses/${courseId}`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("usertoken"),
        },
      })
      .then((response) => {
        const data = response.data;
        alert(data.message);
      });
  };

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
                  handleBuyCourse(course._id);
                }}
              >
                Buy Course
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
