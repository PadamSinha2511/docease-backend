const {Router} = require("express");
const { handleAppointment, handleGetAllAppointments, handleGetAllAppointmentForPatient, handleGetAllAppointmentForDoctor } = require("../controllers/appointment");

const router = Router();

router.post("/book",handleAppointment)
router.get("/all",handleGetAllAppointments)
router.post("/patient",handleGetAllAppointmentForPatient)
router.post("/doctor",handleGetAllAppointmentForDoctor)


module.exports=router   