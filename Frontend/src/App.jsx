import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Signup } from "./components/Signup/Signup";
import { Login } from "./components/Login/Login";
import { UserCourses } from "./components/UserCourses/UserCourses";
import { AdminCourses } from "./components/AdminCourses/AdminCourses";
import { Landing } from "./components/LandingPage/Landing";
import { CreateCourse } from "./components/CreateCourse/CreateCourse";
import { EditCourse } from "./components/EditCourse/EditCourse";
import { Prelogin } from "./components/Prelogin/Prelogin";
import { RecoilRoot } from "recoil";
import { UserPurchasedCourses } from "./components/userPurchasedCourses/userPurchasedCourses";
import { AdminLogin } from "./components/Login/AdminLogin";
import { AdminSignup } from "./components/Signup/AdminSignup";

function App() {
  return (
    <div className="app">
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/start" element={<Prelogin />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/users/signup" element={<Signup />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/users/courses" element={<UserCourses />} />
            <Route path="/users/purchasedCourses" element={<UserPurchasedCourses />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/courses/:courseId" element={<EditCourse />} />
            <Route path="/admin/createCourse" element={<CreateCourse />} />
            {/* <Route path="/courses" element={<ShowCourses />} /> */}
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
