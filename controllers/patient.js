const Patient = require("../modals/patient")

async function handleSignup(req,res)
{
    const {name,email,password,photo,phoneNumber,dateOfBirth,medicalHistory} = req.body;

    const isUserPresent = await Patient.findOne({email})

    if(isUserPresent)
    {
        return res.status(400).json({success:false,msg:"User already exsist"});
    }

  
   
        const user = await Patient.create({
            name,
            email,
            password,
            phoneNumber,
            dateOfBirth,
            medicalHistory,
            photo
        })

        return res.status(200).json({success:true,msg:"User created successfully"})
   
   }


async function handleSignIn(req,res)
{
    const {email,password} = req.body;
    try {
        const resUser = await Patient.matchPassword(email,password);
        return res.cookie("token",resUser.token).json({...resUser,token:undefined})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,msg:"Error occured while signing In"});
    }
}



module.exports={
    handleSignup,
    handleSignIn,
 
}