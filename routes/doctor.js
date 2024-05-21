const {Router} = require("express");
const { handleSignup, handleSignIn, handleFetchAllDoc } = require("../controllers/doctor");

const router = Router();

router.post("/signup",handleSignup)
router.post("/signin",handleSignIn)
router.get("/all",handleFetchAllDoc)
module.exports = router