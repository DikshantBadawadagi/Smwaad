import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
    const [username, setUsername] = useState("");
    const [rollno, setRollno] = useState("");
    const navigate = useNavigate();
    //   const [results, setResults] = useState({
    //     name: "",
    //     marks: 0,
    //   });
    //   const dispatch=useDispatch();
    function handleSubmit(e) {
        e.preventDefault();
        const user = localStorage.setItem('username', JSON.stringify(username));
        const rollNo = localStorage.setItem('rollNo', JSON.stringify(rollno));
        console.log(user);
        console.log(rollNo);
        navigate("/test");
        // dispatch({type:"START_TEST",payload:{...results,navigate}})
    }
    return (
        <div className='login'>
            <div class='form-body'>
                <div className='form-signin'>
                    <div className='form-logo'></div>
                    <div class="form-title">Enter Your Details!</div>
                    <div className='inputs'>
                        <input className='details' type='text' placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input className='details' type='text' placeholder='Roll No.' value={rollno} onChange={(e) => setRollno(e.target.value)} />
                        <button variant="primary" onClick={handleSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login