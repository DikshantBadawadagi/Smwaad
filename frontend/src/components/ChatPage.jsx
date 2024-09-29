import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode, Send } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUsers, messages } = useSelector(store => store.chat);
    const dispatch = useDispatch();

    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/message/send/${receiverId}`, { textMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    }, []);

    return (
        <div className='flex ml-[20%] h-screen bg-gradient-to-br from-purple-50 to-indigo-50'>
            <section className='w-full md:w-1/4 my-8 bg-white rounded-l-2xl shadow-md'>
                <h1 className='font-bold mb-4 px-6 py-4 text-2xl text-indigo-800'>{user?.username}</h1>
                <hr className='mb-4 border-gray-200' />
                <div className='overflow-y-auto h-[calc(100vh-12rem)] px-2'>
                    {suggestedUsers.map((suggestedUser) => {
                        const isOnline = onlineUsers.includes(suggestedUser?._id);
                        return (
                            <div 
                                key={suggestedUser?._id}
                                onClick={() => dispatch(setSelectedUser(suggestedUser))} 
                                className='flex gap-4 items-center p-4 hover:bg-indigo-50 cursor-pointer rounded-xl transition-all duration-300 ease-in-out mb-2'
                            >
                                <Avatar className='w-12 h-12'>
                                    <AvatarImage src={suggestedUser?.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <span className='font-medium text-gray-800'>{suggestedUser?.username}</span>
                                    <span className={`text-xs font-bold ${isOnline ? 'text-green-500' : 'text-gray-400'}`}>
                                        {isOnline ? 'online' : 'offline'}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
            {selectedUser ? (
                <section className='flex-1 bg-white rounded-r-2xl shadow-md flex flex-col h-full'>
                    <div className='flex gap-4 items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10'>
                        <Avatar className='w-10 h-10'>
                            <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <span className='font-medium text-indigo-800'>{selectedUser?.username}</span>
                        </div>
                    </div>
                    <Messages selectedUser={selectedUser} />
                    <div className='flex items-center p-4 border-t border-gray-200'>
                        <Input 
                            value={textMessage} 
                            onChange={(e) => setTextMessage(e.target.value)} 
                            type="text" 
                            className='flex-1 mr-2 focus-visible:ring-indigo-300 bg-gray-50' 
                            placeholder="Type your message..." 
                        />
                        <Button 
                            onClick={() => sendMessageHandler(selectedUser?._id)}
                            className='bg-indigo-600 hover:bg-indigo-700 text-white'
                        >
                            <Send className='w-4 h-4 mr-2' /> Send
                        </Button>
                    </div>
                </section>
            ) : (
                <div className='flex-1 flex flex-col items-center justify-center bg-white rounded-r-2xl shadow-md'>
                    <MessageCircleCode className='w-32 h-32 my-4 text-indigo-300' />
                    <h1 className='font-medium text-2xl text-indigo-800 mb-2'>Your messages</h1>
                    <span className='text-gray-600'>Send a message to start a chat.</span>
                </div>
            )}
        </div>
    )
}

export default ChatPage