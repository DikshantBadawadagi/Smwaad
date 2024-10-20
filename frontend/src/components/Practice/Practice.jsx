import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Practice.css';

const Practice = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='StudentData'>
        <span className='tableHeading'>
          <h1>Practice Exercises</h1>
        </span>
      </div>
      <div className='exercises'>
        {/* Card 1: Before After */}
        <div className='card'>
          <div className='card-img'></div>
          <h3>Before After</h3>
          <p>
            <button
              className='exercise-link'
              onClick={() => navigate('/bf_af')}
            >
              Click to Open!
            </button>
          </p>
        </div>
        
        {/* Card 2: Greater/Smaller */}
        <div className='card'>
          <div className='card-img'></div>
          <h3>Greater/Smaller</h3>
          <p>
            <button
              className='exercise-link'
              onClick={() => navigate('/gr_sm')}
            >
              Click Here!
            </button>
          </p>
        </div>

        {/* Card 3: Arithmetics */}
        <div className='card'>
          <div className='card-img'></div>
          <h3>Arithmetics</h3>
          <p>
            <button
              className='exercise-link'
              onClick={() => navigate('/sum')}
            >
              Click Here!
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Practice;
