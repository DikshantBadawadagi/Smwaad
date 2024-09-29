import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Sum.css";
import q1 from "./images/q1.png"
import q2 from "./images/q2.png"
import q3 from "./images/q3.png"
import q4 from "./images/q4.png"
import q5 from "./images/q5.png"
import q6 from "./images/q6.png"
import q7 from "./images/q7.png"
var marks=0;
var arrayQuest=[
    {
        question: <img src={q1} alt="images" />,
        a:5,b:7,c:6,d:10,
        correct:"c",
      },
      {
        question:<img src={q2} alt="images" />,
        a:5,b:4,c:6,d:3,
        correct: "d",
      },
      {
        question:<img src={q3} alt="images" />,
        a:4,b:8,c:6,d:9,
        correct: "b",
      },
      {
        question:<img src={q4} alt="images" />,
        a:7,b:5,c:6,d:8,
        correct: "a",
      },
      {
        question:<img src={q5} alt="images" />,
        a:5,b:4,c:2,d:3,
        correct: "b",
      },
      {
        question:<img src={q6} alt="images" />,
        a:1,b:2,c:4,d:0,
        correct: "d",
      },
      {
        question:<img src={q7} alt="images" />,
        a:2,b:4,c:6,d:3,
        correct: "a",
      },
      {
        question:"What is the value of 2! ?",
        a:4,b:6,c:24,d:2,
        correct:"d",
      }
];
const Sum = () => {  
    const Navigate = useNavigate();
    const [qno, setQno] = useState(arrayQuest[0]);
    // const [score, setScore] = useState(0);
    // const [arrayQuest,setarrayQuest] = useState(arrayQuest[0]);
    // const [level,setLevel] = useState(0);
    // const [levelName,setLevelName] = useState("Level1");
    const [buttonName,setButtonName] = useState("Next Question");
    // console.log("Test");
    // const questions=useSelector((state)=>state.questions);
    const user=JSON.parse(localStorage.getItem('username'));
    console.log(user);
    useEffect(()=>
    {
    //   if(marks>=5)
    //   {
    //     setarrayQuest(arrayQuest[level]);   
    //     // setLevelName(`Level${level+1}`);
    //   }
    //   else 
    //   {      
    //     marks=0;
    //   }
    //   setQno(0);
    //   console.log("level changed to : !!",level);
    //   console.log("Question changed to : !!",qno);
        setQno(arrayQuest[0]);
    },[]);
    
    
    const QuestionFormat = ({ qn }) => {
      console.log("Question");
      if (qn < arrayQuest.length) {
        return (
          <div className="Questionformat">
            <h1 className="questionHeader">{arrayQuest[qn].question}</h1>
            <div className="Answerformat">
            <div className="oA" id="op1" type="button" name="op">{arrayQuest[qn].a}</div>
            <div className="oB">
            <label for="op2">{arrayQuest[qn].b}</label>
            <input id="op2" type="button" name="op" value="b"></input>
            </div>
            <div className="oC">
            <label for="op3">{arrayQuest[qn].c}</label>
            <input id="op3" type="button" name="op" value="c"></input>
            </div>
            <div className="oD">
            <label for="op4">{arrayQuest[qn].d}</label>
            <input id="op4" type="button" name="op" value="d"></input>
            </div>
          </div>
          </div>
        );
      } 
    };
  
  
    // const AnswerFormat = ({ qn }) => {
    //   if (qn < arrayQuest.length)
    //   console.log("Answer");
    //     return (
    //       <div className="Answerformat">
    //         <div className="oA">
    //         <Label for="op1">{arrayQuest[qn].a}</Label>
    //         <input id="op1" type="radio" name="op1" value="a"></input>
    //         </div>
    //         <div className="oB">{arrayQuest[qn].b}</div>
    //         <div className="oC">{arrayQuest[qn].c}</div>
    //         <div className="oD">{arrayQuest[qn].d}</div>
    //       </div>
    //     );
    // };
  
    const HandleNext = () => {
      if(qno<arrayQuest.length){
        var ans='a';    
        if(document.getElementById("op1").checked ===true)ans='a';
        else if(document.getElementById("op2").checked ===true)ans='b';
        else if(document.getElementById("op3").checked ===true)ans='c';
        else if(document.getElementById("op4").checked ===true)ans='d';    
        if(ans===arrayQuest[qno].correct)marks+=1;
        console.log("score : ",marks);
        console.log("NextQuestion : ", qno);
        setQno(qno + 1);
        console.log(qno);
      }
    //   else  if(marks>=0.5*arrayQuest.length)setLevel(level+1);
    //   else setLevel(level);
    };
  
    const NextButton = () => {    
      if(qno===arrayQuest.length){setButtonName("Go To Next Level");}
      if(qno===0){setButtonName("Next Question");}
      return (      
        <div className="navigator">
          <button className="nextBtn"onClick={HandleNext}>{buttonName}</button>
        </div>
      );
    };  
  
    return (
      <>
      <div className="bd">
      {/* <h1 className="level">{levelName}</h1> */}
      <div className="Question-test">
        <QuestionFormat qn={qno} />
        <NextButton />
      </div>
      </div>
      </>
    );
  };
export default Sum;