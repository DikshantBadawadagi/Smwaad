import React, { useEffect,useState } from 'react'
import axios from 'axios'
import './Questions.css'
const Questions = () => {
    const [questions,setQuestions]=useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/questions').then(res => {
            console.log(res);
            setQuestions(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
  return (
    <div>
        <div className='StudentData'>
        <span className='tableHeading'>
        <h1>Questions List</h1>
        </span>
        <table>
            <thead>
                <tr>
                    <th>Question Title</th>
                    <th>Option A</th>
                    <th>Option B</th>
                    <th>Option C</th>
                    <th>Option D</th>
                    <th>Answer</th>
                    <th>Level</th>
                </tr>
            </thead>
            <tbody>
                {questions.map((questions)=>{
                    return(
                        <tr>
                            <td>{questions.question}</td>
                            <td>{questions.OptionA}</td>
                            <td>{questions.OptionB}</td>
                            <td>{questions.OptionC}</td>
                            <td>{questions.OptionD}</td>
                            <td>{questions.Answer}</td>
                            <td>{questions.Level}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default Questions