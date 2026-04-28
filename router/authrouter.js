const express = require("express")
const {register,login ,logout,verifyotp, sendVerificationEmail, isAuthenticated, resetPassword, confirmPasswordReset} = require("../controller/authcontroller")
const authenticateToken = require("../middleware/authuser")

const router= express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.post("/verifyotp",authenticateToken,verifyotp)
router.post("/verifyemail",authenticateToken,sendVerificationEmail)
router.post("/is-auth",authenticateToken,isAuthenticated)
router.post("/reset-pass",resetPassword)
router.post("/confirm-reset-pass",confirmPasswordReset)



module.exports = router;