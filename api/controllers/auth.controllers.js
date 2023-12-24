import User from "../models/user.model.js";

export const signin = (req,res)=>{{
    
    const {username,email,password} = req.body;
    const newUser = new User({
        username,
        email,
        password,
    });
    newUser.save().then((savedUser)=>{
        res.status(200).json({message:"user created successfully"})
    }).catch((err)=>{
        res.status(500).json({error:"internal srerver error"});
    })

}}

