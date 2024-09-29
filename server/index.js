import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import questionRouters from './routes/quiz.js';
import resultRouters from './routes/result.js';
import dotenv from 'dotenv';
const app=express();
dotenv.config();
app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}));
app.use(cors());
app.use('/questions',questionRouters);
app.use('/results',resultRouters);
mongoose.set("strictQuery",false);
const PORT= process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>app.listen(PORT,()=>console.log('Connected to MongoDB at Port :'+ PORT)))
    .catch((error)=> console.log(error.message));