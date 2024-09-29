import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom/client";

const Home = () => {
  return (
    <div className="home">
      <section class="parallax-container">
        {/* <h1>QUIZ WIZARDS</h1> */}
        <p>
          {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          beatae, excepturi atque ex molestias quisquam in! Laboriosam debitis
          vel sit incidunt pariatur a aliquid. Vitae sapiente itaque debitis
          repudiandae qui! */}
        </p>
      </section>

      {/* <section class="buffer"></section> */}

      <section class="parallax-container parallax-container2">
        <div class="card">
          {/* <Link to="/studentlogin"> */}
            <div class="card-img"></div>
            <h3>QUIZ</h3>
            <p>
             Go to the Quiz Section to test your Knowledge.<br/>
          <a href="/login">
            Click Here!
          </a>
            </p>
        </div>
        <div class="card">
          <div class="card-img"></div>
          <h3>PRACTICE</h3>
          <p>
            Practice to get your self acquanted <br/>with the questions.
          </p>
          <a href="/exercises">Click here!</a>
        </div>
       <div class="card">
          <div class="card-img"></div>
          <h3>Teachers Portal</h3>
          <p>
            Adding Questions and Student Details<br/><br/>
          </p>
          <a href="/teacher">Click Here!</a>
        </div>
      </section>
    </div>
  );
};
export default Home;