import express from 'express';
import { signin, signup } from '../controllers/auth.controllers.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const router = express.Router();
const secretKey = "iamwhatiam"

const isAuthenticated =((req,res,next)=>{
    const token = req.headers.token;
    console.log("token in auth",token);
    if(!token)
    {
        // res.redirect("api/login")
        console.log("no token")
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }
    jwt.verify(token,secretKey,(err,decoded)=>{
        if(err){
            console.log("invalid token")
            return res.status(403).json({ message: ' Invalid token' });
        }
        req.email=decoded.email;
        console.log(req.email);
        next();

    })
})

router.post('/signup',signup);


router.post('/signin',signin)


router.get("/check",isAuthenticated,async(req,res)=>{
    console.log("in check and email is: ",req.email);
    const userDetail = await User.findOne({email:req.email})
    console.log(userDetail);
    res.status(200).json({message:"true",data:userDetail});
})


export default router;