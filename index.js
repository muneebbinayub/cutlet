import express from 'express';
import router from './api/routes/routes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected successfully");
}).catch((err)=>{
    console.log("Error while connecting",err);
})

// create express app
const app = express();

const port = 200;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  
    next();
  });



app.use(express.json());

app.use("/api",router);


app.listen(port,()=>[
    console.log("app is listning on port",port)
])
