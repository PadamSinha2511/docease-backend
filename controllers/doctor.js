const Doctor = require("../modals/doctor")

async function handleSignup(req,res)
{
    const {name,email,password,photo,phoneNumber,specialty,experience} = req.body;

    const isUserPresent = await Doctor.findOne({email})

    if(isUserPresent)
    {
        return res.status(400).json({success:false,msg:"User already exsist"});
    }

  
   
        const user = await Doctor.create({
            name,
            email,
            password,
            phoneNumber,
            specialty,
            experience,
            photo
        })

        return res.status(200).json({success:true,msg:"User created successfully"})
   
   }


async function handleSignIn(req,res)
{
    const {email,password} = req.body;
    try {
        const resUser = await Doctor.matchPassword(email,password);
        
        return res.cookie("token-docease",resUser.token).json({...resUser,token:undefined})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,msg:"Error occured while signing In"});
    }
}

async function handleFetchAllDoc(req,res)
{
    try {
        const allDocs = await Doctor.find().select("-salt");
        return res.status(200).json({success:true,allDocs});
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,msg:"Server error to fetch doctors"})
    }
}

module.exports={
    handleSignup,
    handleSignIn,
    handleFetchAllDoc
 
}