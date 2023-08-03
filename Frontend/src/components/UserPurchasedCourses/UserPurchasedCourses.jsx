import React, { useState, useEffect } from "react";
import axios from "axios";
import "../UserCourses/UserCourses.css"
import { Appbar } from "../Appbar/Appbar";

export const UserPurchasedCourses = () => {
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:3000/users/purchasedCourses`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("usertoken")
        }
      }).catch(err => {console.log(err);})
      .then(response => {
        if(response)
        {
            setCourses(response.data.purchasedCourses);
        }
      })
    },[])
    
  return (
    <>
    <Appbar />
    <div className="courses">
    {
        courses.map(course => {
            return <div key = {course._id} className="courseCard">
                <div className="image">
                    <img src={course.imageLink} alt="" />
                </div>
                <div className="title">{course.title}</div>
                <div className="description">{course.description}</div>
                <div className="price">Price: {course.price} INR</div>
                <button className="button"> View Course</button>
            </div>
        })
    }
  </div>
  </>
  )
}
