import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sum.css"; // Ensure to enhance this CSS
import q1 from "./images/q1.png";
import q2 from "./images/q2.png";
import q3 from "./images/q3.png";
import q4 from "./images/q4.png";
import q5 from "./images/q5.png";
import q6 from "./images/q6.png";
import q7 from "./images/q7.png";

// Questions array with images and answers
const arrayQuest = [
  {
    question: <img src={q1} alt="Question 1" />,
    a: 5,
    b: 7,
    c: 6,
    d: 10,
    correct: "c",
  },
  {
    question: <img src={q2} alt="Question 2" />,
    a: 5,
    b: 4,
    c: 6,
    d: 3,
    correct: "d",
  },
  {
    question: <img src={q3} alt="Question 3" />,
    a: 4,
    b: 8,
    c: 6,
    d: 9,
    correct: "b",
  },
  {
    question: <img src={q4} alt="Question 4" />,
    a: 7,
    b: 5,
    c: 6,
    d: 8,
    correct: "a",
  },
  {
    question: <img src={q5} alt="Question 5" />,
    a: 5,
    b: 4,
    c: 2,
    d: 3,
    correct: "b",
  },
  {
    question: <img src={q6} alt="Question 6" />,
    a: 1,
    b: 2,
    c: 4,
    d: 0,
    correct: "d",
  },
  {
    question: <img src={q7} alt="Question 7" />,
    a: 2,
    b: 4,
    c: 6,
    d: 3,
    correct: "a",
  },
];

const Sum = () => {
  const navigate = useNavigate();
  const [qno, setQno] = useState(0);
  const [marks, setMarks] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    setSelectedAnswer("");
  }, [qno]);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleNext = () => {
    if (selectedAnswer === arrayQuest[qno].correct) {
      setMarks((prev) => prev + 1);
    }

    if (qno < arrayQuest.length - 1) {
      setQno(qno + 1);
    } else {
      alert(`Quiz finished! You scored ${marks + (selectedAnswer === arrayQuest[qno].correct ? 1 : 0)} marks.`);
      navigate('/next-level'); // Navigate to next level
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Math Quiz</h1>
      <div className="question-card">
        <div className="question-format">
          <h2>{arrayQuest[qno].question}</h2>
        </div>
        <div className="answer-format">
          <div>
            <input
              type="radio"
              name="answer"
              value="a"
              checked={selectedAnswer === "a"}
              onChange={handleAnswerChange}
            /> {arrayQuest[qno].a}
          </div>
          <div>
            <input
              type="radio"
              name="answer"
              value="b"
              checked={selectedAnswer === "b"}
              onChange={handleAnswerChange}
            /> {arrayQuest[qno].b}
          </div>
          <div>
            <input
              type="radio"
              name="answer"
              value="c"
              checked={selectedAnswer === "c"}
              onChange={handleAnswerChange}
            /> {arrayQuest[qno].c}
          </div>
          <div>
            <input
              type="radio"
              name="answer"
              value="d"
              checked={selectedAnswer === "d"}
              onChange={handleAnswerChange}
            /> {arrayQuest[qno].d}
          </div>
        </div>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
      <div className="score-display">Score: {marks}</div>
    </div>
  );
};

export default Sum;
