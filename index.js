require('dotenv').config();

const express  = require("express");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require("cors")
//express app

const app = express();



//regular middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//cookie-parser and file upload
app.use(cookieParser());
app.use(cors({
    origin:"*"
}))
//Routes

const patientRoutes = require("./routes/patient")
const doctorRoutes = require("./routes/doctor")
const appointmentRoutes = require("./routes/appointment")



app.use("/api/patient",patientRoutes)
app.use("/api/doctor",doctorRoutes)
app.use("/api/appt",appointmentRoutes)

module.exports=app;