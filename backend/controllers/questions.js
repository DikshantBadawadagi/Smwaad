import mongoose from "mongoose";
import express from "express";
import Questions from "../models/questions.js";
const router=express.Router();

export const createQuestion= async (req,res)=>{
    // res.send("Post Ban gaya");
    const question= req.body;
    const newQuestion = new Questions({...question});
    try{
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch(error){
        res.status(409).json({message:error});
    }
}
export const getQuestions=async(req,res)=>{
    try{
        // res.send("Question aa gye bhai");
        const questions= await Questions.find();
        console.log(questions);
        res.status(200).json(questions);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}
export default router;