<<<<<<< HEAD
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
    },[])
  return <>{children}</>
}

=======
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
    },[])
  return <>{children}</>
}

>>>>>>> 6fa5ee436a07f107cb4d29c67bd2626acd18c259
export default ProtectedRoutes;