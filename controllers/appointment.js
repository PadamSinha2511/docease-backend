const Doctor = require("../modals/doctor")
const Patient = require("../modals/patient");
const Appointment = require("../modals/appoitment")
async function handleAppointment(req,res)
{
    const {patientId,doctorId,status}=req.body;

   try {
    const patient = Patient.findById(patientId);
    const doctor = Doctor.findById(doctorId);

    if(!patient || !doctor)
    {
        return res.status(404).json({success:false,msg:"Invalid patient or doctor"})
    }

    const newAppoitment = new Appointment({
        patientId,
        doctorId,
        status,
        
    })

    await newAppoitment.save();
    return res.status(200).json({success:true,msg:"Appointment Booked"})
   } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,msg:"Server error"})
   }



}

async function handleGetAllAppointments(req,res)
{

    try {
        
        
        let allAppt = await Appointment.find().populate("patientId","-salt").populate("doctorId","-salt" )
            return res.status(200).json({success:true,allAppt});
    } catch (error) {
        console.log(error)
    }
}

async function handleGetAllAppointmentForPatient(req,res)
{
    const {patientId} = req.body;

    try {
        const allAppointment = await Appointment.find({patientId}).populate("doctorId","-salt")
        return res.status(200).json({success:true,allAppointment})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,msg:"Server Error"})
    }

}
async function handleGetAllAppointmentForDoctor(req,res)
{
    const {doctorId} = req.body;

    try {
        const allAppointment = await Appointment.find({doctorId}).populate("patientId","-salt")
        return res.status(200).json({success:true,allAppointment})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,msg:"Server Error"})
    }

}



async function handleUpdateStatusNotes(req,res)
{
      const {appointmentId,notes} = req.body
      
        const isAppointment = await Appointment.findById(isAppointment);
        if(!isAppointment)
        {
            return res.status(400).json({success:false,msg:"Appointment id not found"})
        }

      const appnt = await Appointment.findByIdAndUpdate(appointmentId,{status:"completed",notes:notes})
    
      return res.status(200).json({success:true,msg:"Appoitmemt updated successfully"})


}


module.exports={
    handleAppointment,
    handleGetAllAppointments,
    handleGetAllAppointmentForPatient,
    handleGetAllAppointmentForDoctor
}