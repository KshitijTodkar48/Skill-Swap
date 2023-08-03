require('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const databaseUrl = process.env.DATABASE_URL;
const PORT = 3000;

app.use(cors());
app.use(express.json());

const adminSecret = "secret$@ad1%^&min*$" ;
const userSecret = "secret$@us1%^&er*$" ;

const generateJwtAdmin = (admin) => {
  const payload = { username: admin.username, role: "admin" } ; 
  return jwt.sign(payload , adminSecret , { expiresIn:'24h'}) ;
}

const generateJwtUser = (user) => {
  const payload = { username: user.username, role: "user" } ; 
  return jwt.sign(payload , userSecret , { expiresIn:'24h'}) ;
}

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: {type: String},
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

// Connect to MongoDB
mongoose.connect(databaseUrl , { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Course-App" });

//middlewares
const adminAuthentication = (req , res , next) => {
  const authHeader = req.headers.authorization ;
  if(authHeader)
  {
    const token = authHeader.split(" ")[1] ;
    jwt.verify(token , adminSecret , (err , admin) => {
      if(err)
      {
        return res.sendStatus(403) ;
      }
      req.admin = admin ;
      next() ;
    })
  }
  else{
    res.sendStatus(401) ;
  }
}

const userAuthentication = (req , res , next) => {
  const authHeader = req.headers.authorization ;
  if(authHeader)
  {
    const token = authHeader.split(" ")[1] ;
    jwt.verify(token , userSecret , (err , user) => {
      if(err)
      {
        return res.sendStatus(403) ;
      }
      req.user = user ;
      next() ;
    })
  }
  else{
    res.sendStatus(401) ;
  }
}

// Admin routes
app.get('/admin/me', adminAuthentication , (req,res) => {
  return res.json({ username: req.admin.username });
})

app.post('/admin/signup', async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body ;
  const admin = await Admin.findOne({ username }) ;
  if(admin)
  {
     return res.status(403).json({ message: 'Admin already exists' });
  }
  const newAdmin = new Admin({ username, password}) ;
  newAdmin.save() ;
  const token = generateJwtAdmin(newAdmin) ;
  res.json({ message: "Admin created successfully." , token }) ;
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  const { username , password } = req.body ;
  const admin = await Admin.findOne({ username, password }) ;
  if(admin)
  {
    const token = generateJwtAdmin(admin) ;
    return res.json({ message: "Logged in successfully." , token }) ;
  }
  res.status(403).json({ message: "Admin authentication failed."}) ;
});

app.post('/admin/courses', adminAuthentication, async (req, res) => {
  // logic to create a course
  const course = await Course.findOne(req.body) ;
  if(course)
  {
     return res.status(403).json({ message: "Course already exists." });
  }
  const newCourse = new Course(req.body) ;
  await newCourse.save() ;
  res.json({ message: "Course created successfully.", courseId: newCourse.courseId }) ;
});

app.put('/admin/courses/:courseId', adminAuthentication, async (req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: "Course updated successfully." });
  } else {
    res.status(404).json({ message: "Course not found." });
  }
});

app.get('/admin/courses', adminAuthentication, async (req, res) => {  
  // logic to get all the courses
  const courses = await Course.find({});
  res.json({ courses }) ;
});

app.get('/admin/courses/:courseId', adminAuthentication, async (req, res) => {  
  // logic to get a particular course
  const course = await Course.findById(req.params.courseId);
  res.json({ course }) ;
});

// User routes
app.get('/users/me', userAuthentication , (req,res) => {
  return res.json({ username: req.user.username });
})

app.post('/users/signup', async (req, res) => {
  // logic to sign up user 
  const { username, password } = req.body ;
  const user = await User.findOne({ username, password }) ;
  if(user)
  {
     return res.status(403).json({ message: "User already exists" });
  }
  const newUser = new User({ username, password }) ;
  await newUser.save() ;
  const token = generateJwtUser(newUser) ;
  res.json({ message: "User created successfully." , token }) ;
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  const { username , password } = req.body ;
  const user = await User.findOne({ username, password }) ;
  if(user)
  {
     const token = generateJwtUser(user) ;
     return res.json({ message: "Logged in successfully." , token }) ;
  }
  res.status(403).json({ message: "User authentication failed."}) ;
});

app.get('/users/courses', async (req, res) => {
  // logic to list all courses
  const courses = await Course.find();
  res.json({ courses }) ;
});

app.post('/users/courses/:courseId', userAuthentication, async (req, res) => {
  // logic to purchase a course
  try{
    const course = await Course.findById(req.params.courseId) ;
  }catch(err)
  {
    return res.status(403).json({ message: "Course not found." });
  }
  const course = await Course.findById(req.params.courseId) ;
  const user = await User.findOne({ username: req.user.username }) ;
  if(user)
  {
    if(user.purchasedCourses.find((ele) => ele._id.toString() === course._id.toString()))
    {
       return res.json({ message: "You have already purchased this course." });
    }
    user.purchasedCourses.push(course) ;
    await user.save();
    return res.json({ message: "Course purchased successfully."}) ;
  }
  res.status(403).json({ message: "User not found."}) ;
});

app.get('/users/purchasedCourses', userAuthentication, async (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({ username: req.user.username }).populate("purchasedCourses") ;
  if(user)
  {
       return res.json({ purchasedCourses: user.purchasedCourses || [] }) ;
  }
  res.status(403).json({ message: "User not found." }) ;
});

app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});
