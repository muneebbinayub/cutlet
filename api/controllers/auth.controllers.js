import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
export const signup = async(req,res)=>{{
    
    const {username,email,password} = req.body;
    const newUser = new User({
        username,
        email,
        password,
    });
    await newUser.save().then((savedUser)=>{
        res.status(200).json({message:"user created successfully"})
    }).catch((err)=>{
        res.status(500).json({error:"internal srerver error"});
        console.log('error in creating user',err);
    })

}}

const secretKey = "iamwhatiam"

export const signin =async(req,res,next)=>{
    const {email,password} = req.body;
    try{
        const response = await User.findOne({email});
        if(response){
            if(password===response.password)
            {
                
                const token = jwt.sign({email:response.email},secretKey)
                console.log("cookie created",token);
                // res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
                res.status(200).json({message:token});
            }
            else{
                res.status(404).json({message:"invalid usrename or password"});
            }
        }
        else{
            res.status(404).json({message:"user not found"})
            console.log("not found",response)
        }
    }catch(err){
        console.log("i found error",err);
        res.status(500).json({messsage:"internal server error"})
    }
}

