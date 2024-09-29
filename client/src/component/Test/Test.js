import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Test.css";
// import Data from "./data";
import q1 from "../Practice/Sum/images/q1.png"
import q2 from "../Practice/Sum/images/q2.png"
import q3 from "../Practice/Sum/images/q3.png"
import q4 from "../Practice/Sum/images/q4.png"
import q5 from "../Practice/Sum/images/q5.png"
import q6 from "../Practice/Sum/images/q6.png"
import q7 from "../Practice/Sum/images/q7.png"
// import { createResult } from "../../actions/results";
var marks = 0;
var marksArr = [];
var count = 0;
var arrayQuest = [
  [
    {
      question: <img src={q1} alt="images" />,
      a: 5,
      b: 7,
      c: 6,
      d: 10,
      correct: "c",
    },
    {
      question: <img src={q2} alt="images" />,
      a: 5,
      b: 4,
      c: 6,
      d: 3,
      correct: "d",
    },
    {
      question: <img src={q3} alt="images" />,
      a: 4,
      b: 8,
      c: 6,
      d: 9,
      correct: "b",
    },
    {
      question: <img src={q4} alt="images" />,
      a: 7,
      b: 5,
      c: 6,
      d: 8,
      correct: "a",
    },
    {
      question: <img src={q5} alt="images" />,
      a: 5,
      b: 4,
      c: 2,
      d: 3,
      correct: "b",
    },
    {
      question: <img src={q6} alt="images" />,
      a: 1,
      b: 2,
      c: 4,
      d: 0,
      correct: "d",
    },
    {
      question: <img src={q7} alt="images" />,
      a: 2,
      b: 4,
      c: 6,
      d: 3,
      correct: "a",
    },
    {
      question: "What is the value of 2! ?",
      a: 4,
      b: 6,
      c: 24,
      d: 2,
      correct: "d",
    },
  ],
  [
    {
      question:"21+12=?",
      a: 35,
      b: 27,
      c: 33,
      d: 30,
      correct: "c",
    },
    {
      question: "30-12=?",
      a: 15,
      b: 24,
      c: 16,
      d: 18,
      correct: "d",
    },
    {
      question: "10+12=?",
      a: 24,
      b: 22,
      c: 26,
      d: 19,
      correct: "b",
    },
    {
      question: "15+15=?",
      a: 30,
      b: 25,
      c: 26,
      d: 31,
      correct: "a",
    },
    {
      question: "20-10=?",
      a: 15,
      b: 10,
      c: 12,
      d: 13,
      correct: "b",
    },
    {
      question: "10+10=?",
      a: 21,
      b: 22,
      c: 24,
      d: 20,
      correct: "d",
    },
    {
      question: "15-13=?",
      a: 2,
      b: 4,
      c: 6,
      d: 3,
      correct: "a",
    },
    {
      question: "10/2=?",
      a: 4,
      b: 6,
      c: 24,
      d: 2,
      correct: "d",
    },
  ],
  [
    {
      question: "3*2=?",
      a: 6,
      b: 3,
      c: 2,
      d: 12,
      correct: "a",
    },
    {
      question: "9*8=?",
      a: 90,
      b: 72,
      c: 63,
      d: 64,
      correct: "b",
    },
    {
      question: "72/12=?",
      a: 5,
      b: 6,
      c: 7,
      d: 8,
      correct: "b",
  },
  ],
];

const Test = () => {
  const Navigate = useNavigate();
  const [qno, setQno] = useState(0);
  // const dispatch= useDispatch();
  // const [score, setScore] = useState(0);
  // const username= JSON.parse(localStorage.getItem("username"));
  // const rollNo= JSON.parse(localStorage.getItem("rollNo"));
  // const [results,setResults] = useState({username,rollNo,marksArr:[]});
  // console.log(user);
  // console.log(rollNo);
  const [QustArray, setQustArray] = useState(arrayQuest[0]);
  const [level, setLevel] = useState(0);
  const [levelName, setLevelName] = useState("Level1");
  const [buttonName, setButtonName] = useState("Next Question");
  const[notChanged,setNotChanged] = useState(1);
  console.log("Test");

  useEffect(() => {
    if (marks >= QustArray.length / 2) {
      marksArr.push(marks);
      alert("Go to next Level");
      setLevelName(`Level${level + 1}`);
      setQustArray(arrayQuest[level]);
      if(level===3){
        // localStorage.setItem("marks",JSON.stringify(marksArr));
        localStorage.marks= JSON.stringify(marksArr);
        Navigate('/scorecard');
      }
    }  
    else if(qno===QustArray.length)
    {
        count++;
        alert("Less Score . Repeat same Level");
    }
    console.log("came to useEffect with new level being : ",level);
    marks=0;
    setQno(0);
    console.log("level changed to : !!", level);
    console.log("Question changed to : !!", qno);
    console.log("array ", marksArr);
    
  }, [level,notChanged]);


  const QuestionFormat = ({ qn }) => {
    console.log("Question");
    if (level < 3 && qn < QustArray.length) {
      return (
        <div className="Questionformat">
          <h1 className="questionHeader">{QustArray[qn].question}</h1>
          <div className="Answerformat">
            <div class="radio-tile-group">
              <div class="input-container">
                <input id="op1" type="radio" name="radio" value="a" />
                <div class="radio-tile">{QustArray[qn].a}</div>
              </div>

              <div class="input-container">
                <input id="op2" type="radio" name="radio" value="b" />
                <div class="radio-tile">{QustArray[qn].b}</div>
              </div>

              <div class="input-container">
                <input id="op3" type="radio" name="radio" value="c" />
                <div class="radio-tile">{QustArray[qn].c}</div>
              </div>

              <div class="input-container">
                <input id="op4" type="radio" name="radio" value="d" />
                <div class="radio-tile">{QustArray[qn].d}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const HandleNext = () => {
    if (qno < QustArray.length) {
      var ans = "a";
      if (document.getElementById("op1").checked === true) ans = "a";
      else if (document.getElementById("op2").checked === true) ans = "b";
      else if (document.getElementById("op3").checked === true) ans = "c";
      else if (document.getElementById("op4").checked === true) ans = "d";
      if (ans === QustArray[qno].correct) {
        marks += 1;        
      }
      console.log("score : ", marks);
      setQno(qno + 1);
      console.log("NextQuestion : ", qno);    
    } 
    else if (marks >= 0.5 * QustArray.length) 
      setLevel(level + 1);
    else setNotChanged(1-notChanged);
  };

  const NextButton = () => {   
    if (qno === QustArray.length) {
      setButtonName("Go To Next Level");
    }
    if (qno === 0) {
      setButtonName("Next Question");
    }
    return (
      <div className="navigator">
        <button className="nextBtn" onClick={HandleNext}>
          {buttonName}
        </button>
      </div>
    );
  };
  if(count===3){
    alert("You have failed 3 times. Please try again later");
    Navigate('/');
  }
  if (level < 3) {
    return (
      <div className="test">
        <div className="bd">
          <h1 className="level">{levelName}</h1>
          <div className="Question-test">
            <QuestionFormat qn={qno} />
            <NextButton />
          </div>
        </div>
      </div>
    );
  } 
};
export default Test;