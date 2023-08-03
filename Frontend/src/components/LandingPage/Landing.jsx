import React from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../Appbar/Appbar";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Image from "./images/image-6.webp";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Appbar />
      <div className="landingPage">
        <div className="first">
          <div className="heading">
            <div>
              <span>Master New Skills</span>
              <span>Today</span>
            </div>
            <h2>
              Unlock your potential with SkillSwap's online courses. Learn from
            </h2>
            <h2>industry experts and stay ahead of the competition.</h2>
          </div>
          <button
            id="startbtn"
            onClick={() => {
              navigate("/start");
            }}
          >
            Get Started <TrendingFlatIcon fontSize="large" />
          </button>
        </div>
        <Aboutus />
        <Footer />
      </div>
    </>
  );
};

export const Aboutus = () => {
  return (
    <div className="second" id="aboutUs">
      <div className="leftsecond">
        <img src={Image} alt="" />
      </div>
      <div className="rightsecond">
        <span>About us</span>
        <p>
          At Skillswap, we are a leading company in providing online courses.
          Our mission is to provide a platform where individuals can enhance
          their skills and knowledge through a wide range of courses offered by
          industry experts and educators can share their knowledge and earn by
          their teaching skills. Whether you are looking to learn a new skill,
          upgrade your existing knowledge, explore a new field, or you want to
          educate others, Skillswap is here to help you achieve your goals. With
          our user-friendly interface, comprehensive course catalog, and secure
          payment system, we strive to make learning experience seamless and
          enjoyable for our users.
        </p>
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <>
      <div className="footer" id="footer">
        <div className="leftfooter">
          <div>Follow us</div>
          <span>Twitter</span>
          <span>Facebook</span>
          <span>LinkedIn</span>
          <span>Instagram</span>
        </div>
        <div className="rightfooter">
          <div>Contact us</div>
          <span>Email: SkillSwap@gmail.com</span>
          <span>Contact: +91 9370837735</span>
        </div>
      </div>
      <div className="credits">Designed and developed by - Kshitij Todkar</div>
      <div className="copyright">
          <span>Copyright </span>
          <CopyrightIcon fontSize="large" />
          <span>2023 SkillSwap | All rights reserved.</span>
      </div>
    </>
  );
};
