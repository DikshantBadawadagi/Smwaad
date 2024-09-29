import React from "react";
import './Greater_Smaller.css'
import { useState } from "react";
import image1 from "./images/img1.jpg";
import image2 from "./images/img2.jpg";
import image3 from "./images/img3.jpg";
import image4 from "./images/img4.jpg";
import image5 from "./images/img5.jpg";
import image6 from "./images/img6.jpg";
import image7 from "./images/img7.jpg";
import image8 from "./images/img8.jpg";
import { useNavigate } from "react-router-dom";
const Images = [image1, image2, image3, image4,image5, image6, image7,image8];
const correctAnswers=[2,2,1,1]
const Greater_Smaller = () => {
    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(1);
    const [b1Disabled,setB1Disabled] = useState(false);
    const [b2Disabled,setB2Disabled] = useState(false);
    const Navigate = useNavigate();
  
    const handleClick = (parameter) => (event) => { 
      const choice = parameter;
      console.log("index 1 is ",index1);
      console.log("choice is ",choice);
      
      if(choice===1)
      {
        document.getElementById("b2").disabled = "true";                      
        if ( correctAnswers[index1/2]===1) {      
          document.getElementById("b1").classList.add("correct");                      
        } 
        else 
        {
          document.getElementById("b1").classList.add("wrong");
        }
        setB2Disabled(true);
      }    
      else 
      {
        console.log("Entered option 2");
        console.log("correct option ",correctAnswers[index1/2]);
        if ( correctAnswers[index1/2]===2) {     
          console.log("correct option");
          
          document.getElementById("b2").classList.add("correct");                      
        } 
        else 
        {
          document.getElementById("b2").classList.add("wrong");
        }
        setB1Disabled(true);
      }
      
    };
  
    const HandleNextQuestion = () => {
      {
       
        if (index2 == Images.length - 1) {
          alert("You have completed the quiz!");
          Navigate("/");
        }
        setIndex1(index1 + 2);
        setIndex2(index2 + 2);
        setB1Disabled(false);
        setB2Disabled(false);
      }
    };
  
    const Header = () => {
      return (
        <div className="header">
          <h1>Which is the smaller between the two ? </h1>
        </div>
      );
    };
  
    const CardElement = (props) => {
      console.log(props.src);
      return (
        <div className="card">
          <img alt="brush" src={props.src} />
        </div>
      );
    };
  
    const NextQuestion = () => {
      return <button onClick={HandleNextQuestion}>Next Question</button>;
      
    };
    const Footer = () => {
      return (
        <div className="footer">
          <h1> footer </h1>
        </div>
      );
    };
  
    const Body = () => {
      var i = 1,
        j = 1;
      return (
        <div className="QuestionBox">
          <div className="body-cards">
            <button id="b1" className='gt' onClick={handleClick(1)} disabled={b1Disabled}>
              <CardElement src={Images[index1]} />
            </button>
            <button id="b2" className='gt' onClick={handleClick(2)}  disabled={b2Disabled}>
              <CardElement src={Images[index2]} />
            </button>
            {/* <button><CardElement/></button> */}
          </div>
          <div>
            <button id="b3" onClick={HandleNextQuestion}>
              Next
            </button>
          </div>
        </div>
      );
    };
  
    return (
      <>
        <div className="Question">
        <Header />
        <Body />
        </div>
      </>
    );
  };

export default Greater_Smaller;
