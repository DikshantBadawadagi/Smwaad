import axios from "axios";
const url= 'http://localhost:5000/questions';

export const fetchQuestions =()=> axios.get(url);
export const createQuestion =(newQuestion)=> axios.post(url,newQuestion);

const url2= 'http://localhost:5000/results';
export const fetchResults =()=> axios.get(url2);
export const createResult =(results)=> axios.post(url2,results);