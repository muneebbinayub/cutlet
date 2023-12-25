import User from "../models/user.model.js";

export const signin = async(req,res)=>{{
    
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

export const signup =async(req,res)=>{
    const {email,password} = req.body;
    try{
        const response = await User.findOne({email});
        if(response){
            res.status(200).json({message:"user found"});
            console.log("found",response);
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

