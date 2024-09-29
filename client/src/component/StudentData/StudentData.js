import React,{useEffect, useState} from 'react'
import './StudentData.css'
import axios from 'axios'
const StudentData = () => {
    const [results,setResults]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8000/results/').then(res=>{
            console.log(res);
            setResults(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[])
  return (
    <div className='StudentData'>
        <span className='tableHeading'>
        <h1>Student Data</h1>
        </span>
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Roll No</th>
                    <th>Level 1</th>
                    <th>Level 2</th>
                    <th>Level 3</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result)=>{
                    return(
                        <tr>
                            <td>{result.username}</td>
                            <td>{result.rollNo}</td>
                            <td>{result.marks1}</td>
                            <td>{result.marks2}</td>
                            <td>{result.marks3}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>
    </div>
  )
}

export default StudentData