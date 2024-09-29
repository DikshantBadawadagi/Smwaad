import React,{useEffect, useState} from 'react';
import './Form.css';
import { useDispatch } from 'react-redux';
import { createQuestion } from '../../actions/questions';
// var questionArray=[];
const Form = () => {
    const url="http://localhost:8000/questions/create";
    const [questionData,setQuestionData]=useState({question:'',OptionA:'',OptionB:'',OptionC:'',OptionD:'',Answer:'',Level:''});
    // const history=useHistory();
    const dispatch=useDispatch();
    const clear=()=>{
        // setCurrentId(0);
        setQuestionData({question:'',OptionA:'',OptionB:'',OptionC:'',OptionD:'',Answer:'',Level:''});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createQuestion({...questionData,setQuestionData}))
        clear();
    }
    return (
        <div class='form-body'>
        <div className='form-signin'>
        <div className='form-logo'></div>
        <div class="form-title">Please Enter the MCQ!</div>
        <div className='inputs'>
            <input className='details' type='text' placeholder='Question' value={questionData.question} onChange={(e)=>setQuestionData({...questionData,question:e.target.value})}/>
            <div className='optionsGrid'>
            <input className='options' type='text' placeholder='OptionA' value={questionData.OptionA} onChange={(e)=>setQuestionData({...questionData,OptionA:e.target.value})} />
            <input className='options' type='text' placeholder='OptionB' value={questionData.OptionB} onChange={(e)=>setQuestionData({...questionData,OptionB:e.target.value})} />
            <input className='options' type='text' placeholder='OptionC' value={questionData.OptionC} onChange={(e)=>setQuestionData({...questionData,OptionC:e.target.value})} />
            <input className='options' type='text' placeholder='OptionD' value={questionData.OptionD} onChange={(e)=>setQuestionData({...questionData,OptionD:e.target.value})} />
            </div>
            <input className='details' type='text' placeholder='Answer' value={questionData.Answer} onChange={(e)=>setQuestionData({...questionData,Answer:e.target.value})} />
            <input className='details' type='text' placeholder='Level' value={questionData.Level} onChange={(e)=>setQuestionData({...questionData,Level:e.target.value})} />
            <button variant="primary" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
        </div>
    );
};
export default Form;