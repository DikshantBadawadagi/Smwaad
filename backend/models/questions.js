import mongoose from "mongoose";


const questionSchema =mongoose.Schema({
    question: String,
    OptionA: String,
    OptionB: String,
    OptionC: String,
    OptionD: String,
    // creator: String,
    Answer: String,
    Level: String,
});
const questions =mongoose.model('questions',questionSchema);

export default questions;