const userModel = require("../model/employee.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const transporter= require("../nodemailer")
const admin= require("../model/admin.model")

const register= async (req,res) => {
    const {name,email,password,role, phone, department,status ,joiningDate,leaves,tasks}= req.body
    //console.log(req.body)
    if (!name || !email || !password ||!role) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }
    try{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
        name,
        password:hashedPassword,
        status,
        email,
        role,
        phone,
        department,
        joiningDate,
        leaves,
        tasks
        });
        await newUser.save();
        const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET,{expiresIn: "7d"});
        // res.json({ message: "User created successfully", token: jwtToken });
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.JWT_NODE_ENV=== "production",
            samesite:process.env.JWT_NODE_ENV=== "production"? "none": "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        console.log('req.cookies:', req.cookies);
        //setup email data
        let mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL, // sender address
            to: email, // list of receivers
            subject: 'Hello', // Subject line
            text:"welcome , you have created your account", // plain text body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });

        return res.status(201).json({ message: "User registered successfully", });
        } catch (error) {
            return res.status(500).json({ message: error.message });
            }   
}

const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });   
        }

        const user;
        if( email === "admin@example.com") {
                        user= await admin.findOne({ email });}

        else {
                        user = await userModel.findOne({ email }) }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(400).json({ message: "Invalid credentials" });
        // }
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{expiresIn: "7d"});
        res.cookie("token", jwtToken, {
            httpOnly: true,
            //secure: process.env.JWT_NODE_ENV === "production",
            // samesite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            
        })    
        return res.status(200).json({ message: "User logged in successfully",user});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const logout= async (req,res)=>{
    try {
        res.clearCookie("token",
            { httpOnly: true,
            secure: process.env.JWT_NODE_ENV=== "production",
            samesite:process.env.JWT_NODE_ENV=== "production"? "none": "strict", }
        );
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

const userData = async (req,res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "success",
            userdata: user
        });
    } catch (error) {       
        res.status(500).json({ message: error.message });
    }       
}

const verifyotp = async (req, res) => {
    console.log("Request body:", req.body);
    const { userId } = req.body
    try {
        const user = await userModel.findById(userId)

        if (user.isAccountVerified) {
            console.log("account is already verified");
            return res.json({ message: "Account is already verified" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000)

        user.verifyOtp = otp
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save()

        let mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL, // sender address
            to: user.email, // list of receivers
            subject: 'Verify your account', // Subject line
            text: `Your verification OTP is ${otp}`, // plain text body
        };

        await transporter.sendMail(mailOptions)

        res.json({ message: "Verification OTP sent successfully" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const sendVerificationEmail = async (req, res) => {
    console.log("Request body:", req.body); // Log the request body for debugging

    const { userId, otp } = req.body
    if (!userId || !otp) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        const user = await userModel.findById(userId)
        console.log(user.verifyOtp)
        if (!user) {
            return res.json({ message: "No user found" })
        }
        if (user.verifyOtp === "" || user.verifyOtp !== otp) {
            return res.json({ message: "Invalid OTP" })
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ message: "OTP expired" })
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0

        await user.save()

        res.json({ message: "Email verified successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const isAuthenticated = async (req, res,) => {
    try {
       return res.status(200).json({message: "success"})
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

const resetPassword= async (req,res) => {
    const {email}=req.body
    if (!email) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({ message: "No user found" })
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY,
            {expiresIn: "7d"});

                res.cookie("token", jwtToken, {
                    httpOnly: true,
                    secure: process.env.JWT_NODE_ENV=== "production",
                    samesite:process.env.JWT_NODE_ENV=== "production"? "none": "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })    
            
                const mailOptions={
                    from: process.env.SMTP_SENDER_EMAIL, // sender address
                    to: user.email, // list of receivers
                    subject: 'Verify your account', // Subject line
                    text: `Your reset password verification OTP is ${otp}`, 
                }

                transporter.sendMail(mailOptions)
                res.json({ message: "Reset password link sent to your email" })   
    } catch (error) {
        res.json({ message: error.message });
           
    }
    
}

const confirmPasswordReset = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({ message: "Invalid OTP" });
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ message: "OTP expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports= {register,login,logout,verifyotp,sendVerificationEmail,isAuthenticated,resetPassword,confirmPasswordReset}
