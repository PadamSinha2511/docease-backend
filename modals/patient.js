const mongoose = require("mongoose")
const {randomBytes,createHmac} = require("node:crypto")
const {generateToken} = require("../config/auth")

const patientSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
      email: {
        type: String,
        required: true,
        unique: true, // Ensures unique email addresses
      },
      password:{
        type:String,
        required:[true,'Please provide password'],
        select:false
    },
      salt:{
        type:String
    },
      phoneNumber: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      medicalHistory: {
        type: String,
        optional: true,
      },
      photo:{
        type:String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    forgotPasswordToken:{
        type:String,
    },
    forgotPasswordExpiry:{
        type:Date
    }
     
},{timeseries:true})


patientSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    const user = this;

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac('sha256',salt).update(user.password).digest('hex')

    this.salt = salt;
    this.password = hashedPassword
    next();

})

patientSchema.static('matchPassword',async function(email,clientPassword){
   
    const user = await this.findOne({email}).select("+password");
    if(!user) throw new Error("No user found ");

   
    const salt = user.salt
    const hashedPassword = user.password

    const userGivenPasswordHashed = createHmac('sha256',salt).update(clientPassword.toString()).digest('hex' )
 
    
    if(userGivenPasswordHashed != hashedPassword) throw new Error('Password does not matched')

    const token  = generateToken(user)
    const resUser = {
        name:user.name,
        _id:user._id,
        email:user.email,
        // isAdmin:user.isAdmin,
        token
    }
    return resUser
})

patientSchema.method('getForgotPasswordToeken',function()
{
    const forgotToken = crypto.randomBytes(10).toString('hex');

    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex');

    this.forgotPasswordExpiry = Date.now()+2*60*1000;

    return forgotToken;
})


patientSchema.method('verifyForgotToken',function(forgotToken)
{
    const hashedClientToken = crypto.createHash('sha256').update(forgotToken).digest('hex');

    if(hashedClientToken !== this.forgotPasswordToken) return false
    
    return true
})

const Patient = mongoose.model("patient",patientSchema)

module.exports=Patient;