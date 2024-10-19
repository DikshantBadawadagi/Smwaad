import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfileState] = useState(null);  // Change the state setter name to avoid conflicts

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/user/${userId}/profile`, { withCredentials: true });
        if (res.data.success) { 
          setUserProfileState(res.data.user);  // Set the local state
          dispatch(setUserProfile(res.data.user));  // Dispatch to Redux store
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, [userId, dispatch]);

  return { userProfile };  // Return userProfile from the hook
};

export default useGetUserProfile;
