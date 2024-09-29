import React, { useState } from 'react'
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/community/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === 'Messages') {
            navigate("/community/chat");
        }
    }

    const sidebarItems = [
        { icon: <Home className="text-indigo-600" />, text: "Home" },
        { icon: <Search className="text-indigo-600" />, text: "Search" },
        { icon: <TrendingUp className="text-indigo-600" />, text: "Explore" },
        { icon: <MessageCircle className="text-indigo-600" />, text: "Messages" },
        { icon: <Heart className="text-indigo-600" />, text: "Notifications" },
        { icon: <PlusSquare className="text-indigo-600" />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut className="text-indigo-600" />, text: "Logout" },
    ]

    return (
        <div className='fixed top-0 z-10 left-0 px-6 bg-white w-[20%] h-screen shadow-lg'>
            <div className='flex flex-col'>
                <h1 className='my-8 pl-3 font-bold text-2xl text-indigo-800'>SMWAAD community</h1>
                <div>
                    {sidebarItems.map((item, index) => (
                        <div 
                            onClick={() => sidebarHandler(item.text)} 
                            key={index} 
                            className='flex items-center gap-4 relative hover:bg-indigo-100 cursor-pointer rounded-xl p-4 my-3 transition-all duration-300 ease-in-out'
                        >
                            {item.icon}
                            <span className="text-gray-700 font-medium">{item.text}</span>
                            {item.text === "Notifications" && likeNotification.length > 0 && (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button size='icon' className="rounded-full h-5 w-5 bg-pink-500 hover:bg-pink-600 absolute -top-1 -right-1 text-xs font-bold">{likeNotification.length}</Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="bg-white rounded-lg shadow-lg p-4">
                                        <div>
                                            {likeNotification.length === 0 ? (
                                                <p>No new notifications</p>
                                            ) : (
                                                likeNotification.map((notification) => (
                                                    <div key={notification.userId} className='flex items-center gap-3 my-2 p-2 hover:bg-gray-50 rounded-md transition-all duration-200'>
                                                        <Avatar>
                                                            <AvatarImage src={notification.userDetails?.profilePicture} />
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>
                                                        <p className='text-sm'><span className='font-bold text-indigo-700'>{notification.userDetails?.username}</span> liked your post</p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <CreatePost open={open} setOpen={setOpen} />
        </div>
    )
}

export default LeftSidebar