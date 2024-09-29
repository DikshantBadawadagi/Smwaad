import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  // Ensure username is required
    },
    rollNo: {
        type: String,
        required: true,  // Ensure roll number is required
    },
    marks1: {
        type: Number,
        required: true,  // Ensure marks1 is required
    },
    marks2: {
        type: Number,
        required: true,  // Ensure marks2 is required
    },
    marks3: {
        type: Number,
        required: true,  // Ensure marks3 is required
    },
}, { timestamps: true });  // Optionally add timestamps for createdAt and updatedAt

// Use singular name for model
const Result = mongoose.model('Result', resultSchema);
export default Result;
