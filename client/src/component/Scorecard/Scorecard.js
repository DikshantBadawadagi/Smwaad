import React, { useEffect, useState } from "react";
import './Scorecard.css'
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createResult } from "../../actions/results";

const ScoreBoard = (props) => {
    const Navigate = useNavigate();
    // const dispatch=useDispatch();
    const user=JSON.parse(localStorage.getItem('username'));
    const rollNo= JSON.parse(localStorage.getItem("rollNo"));
    const [results,setResults]=useState({username:user,rollNo:rollNo,marks1:0,marks2:0,marks3:0})
    var score= JSON.parse(localStorage.marks);
    function handleClick(e){
      e.preventDefault();
      console.log(typeof(score[0]));//number
      console.log(score[0])
      const m1=score[0];
      const m2=score[1];
      const m3=score[2];
      axios.post('http://localhost:5000/results',{
        username:user,
        rollNo:rollNo,
        marks1:m1,
        marks2:m2,
        marks3:m3
      }).then(res=>console.log(res.data)).catch(err=>console.log(err))
      
      // setResults({username:user,rollNo:rollNo,marks1:m1,marks2:m2,marks3:m3});
      // dispatch(createResult({...results,setResults}))
      localStorage.clear();
        Navigate("/");
    }
  return (
<div className="C1">
      <h1>You Have Completed All The Levels</h1>
      <div className="C2">
        <p className="p11">
          Your Score for Level1 is:{score[0]}
          <br />
          Your % for Level1 is: {(score[0] / 8) * 100 + "\n"}
        </p>
        <p className="p11">
          Your Score for Level2 is:{score[1] + "\n"}
          <br />
          Your % for Level2 is: {(score[1] / 8) * 100 + "\n"}
        </p>
        <p className="p11">
          Your Score for Level3 is:{score[2] + "\n"}
          <br />
          Your % for Level3 is: {(score[2] / 4) * 100 + "\n"}
        </p>
      </div>

      <button className="btn" onClick={handleClick}>
        Go To Home
      </button>
    </div>
  );
};
export default ScoreBoard;