import React from 'react'
import './Practice.css'
const Practice = () => {
  return (
    <>
      <div className='StudentData'>
        <span className='tableHeading'>
        <h1>Practice Exercises</h1>
        </span>
      </div>
    <div className='exercises'>
      {/* <section class="parallax-container parallax-container2"> */}
        <div class="card">
            <div class="card-img"></div>
            <h3>Before After</h3>
          <a className='exercise-link' href="/bf_af">
            Click to Open!
          </a>
        </div>
        <div class="card">
          <div class="card-img"></div>
          <h3>Greater/Smaller</h3>
          <p>
           <a className='exercise-link' href="/gr_sm">Click Here!</a>
          </p>
        </div>
       <div class="card">
          <div class="card-img"></div>
          <h3>Arithmetics</h3>
          <a className='exercise-link' href="/sum">Click Here!</a>
        </div>
      {/* </section> */}

    </div>
    </>
  )
}

export default Practice;