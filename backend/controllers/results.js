import mongoose from "mongoose";
import express from "express";
import Results from "../models/results.js";
const router=express.Router();
export const createResult= async (req,res)=>{
    // res.send("Post   Ban gaya");
    const result= req.body;
    const newResult = new Results(result);
    try{
        await newResult.save();
        res.status(201).json(newResult);
    } catch(error){
        res.status(409).json({message:error});
    }};
export const getResults=async(req,res)=>{
    try{
        // res.send("Question aa gye bhai");
        const results= await Results.find();
        console.log(results);
        res.status(200).json(results);
    }catch(error){
        console.log(error)
        res.status(404).json({message:error.message});
    }
}