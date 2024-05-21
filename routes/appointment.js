const {Router} = require("express");
const { handleAppointment, handleGetAllAppointments, handleGetAllAppointmentForPatient, handleGetAllAppointmentForDoctor, handleDecline, handleAccept, handleUpdateStatus } = require("../controllers/appointment");

const router = Router();

router.post("/book",handleAppointment)
router.get("/all",handleGetAllAppointments)
router.post("/patient",handleGetAllAppointmentForPatient)
router.post("/doctor",handleGetAllAppointmentForDoctor)
router.post("/decline",handleDecline)
router.post("/accept",handleAccept)
router.post("/updatestatus",handleUpdateStatus)
module.exports=router   