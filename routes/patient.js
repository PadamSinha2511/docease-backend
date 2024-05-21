const {Router} = require("express");
const { handleSignup, handleSignIn } = require("../controllers/patient");

const router = Router();

router.post("/signup",handleSignup)
router.post("/signin",handleSignIn)
router.get("/",(req,res)=>{
    res.json({msg:"This is docease server"})
})
module.exports = router