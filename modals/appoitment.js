const mongoose =require("mongoose")

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "patient", // Reference to the patients collection
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "doctor", // Reference to the doctors collection
      },
      // appointmentTime: {
      //   type: Date,
      //   required: true,
      // },
     
      // reasonForVisit: {
      //   type: String,
      //   required: true,
      // },
      status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending",
      }
      // notes: {
      //   type: String,
      //   optional: true,
      // }
},{ strictPopulate: false })

const Appointment = mongoose.model("appointment",appointmentSchema)
module.exports=Appointment;