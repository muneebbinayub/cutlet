import express from "express";
import { signin, signup } from "../controllers/auth.controllers.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import multer from "multer";
import Image from "../models/image.model.js";

const router = express.Router();
const secretKey = "iamwhatiam";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const isAuthenticated = (req, res, next) => {
  const token = req.headers.token;
  console.log("token in auth", token);
  if (!token) {
    // res.redirect("api/login")
    console.log("no token");
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("invalid token");
      return res.status(403).json({ message: " Invalid token" });
    }
    req.email = decoded.email;
    console.log(req.email);
    next();
  });
};

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/check", isAuthenticated, async (req, res) => {
  console.log("in check and email is: ", req.email);
  const userDetail = await User.findOne({ email: req.email });
  console.log(userDetail);
  res.status(200).json({ message: "true", data: userDetail });
});

router.post("/admin",upload.single('image'), async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;
  const image = new Image({
    filename: originalname,
    data: buffer,
    contentType: mimetype,
  });
  await image
    .save()
    .then((savedImage) => {
      res.status(200).json({ message: "image uploaded successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/hero",async(req,res)=>{
 try{   const email = req.params.email
        console.log(email);
    const response = await Image.find({email});
    console.log(response)
    if(response){
        const imageData = response.map(img => ({
            filename: img.filename,
            contentType: img.contentType,
            data: img.data.toString("base64"),
          }));
        console.log(imageData);
          res.status(200).json(imageData);
    }
    else{
        res.status(404).json({"messsage":"Image not Found"});
    }}catch(err){
        console.log(err);
        res.status(500).json({"message":"Internal Server Error"});
    }
})

router.get("/heromain",async(req,res)=>{
    try{
        const data = await User.find();
        if(data){
            console.log(data);
            res.status(200).json(data);
        }else{
            res.status(404).json({message:"Data not found"});
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"})
    }
})

export default router;
