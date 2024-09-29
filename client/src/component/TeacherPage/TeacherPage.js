import React from 'react'
import './TeacherPage.css'
const TeacherPage = () => {
  return (
    <div className='teacher'>
        <div className='title'>
        TeacherPage
        </div>
        <div className='card-grid'>
        <div class="card">
          <div class="card-img"></div>
          <h3>ADD QUESTION</h3>
          <p className='teacherPara'>
           Form to add questions to the Database. <br />
            <a className='teacherLink' href="/form">Learn more</a>
          </p>
        </div>

        <div class="card">
          <div class="card-img"></div>
          <h3>STUDENTS INFORMATION</h3>
          <p className='teacherPara'>
            Dashboard to view the students information. <br />
          </p>
          <a className='teacherLink' href="/dashboard">Learn more</a>
        </div>

        </div>
    </div>
    // </div>
  )
}

export default TeacherPage;