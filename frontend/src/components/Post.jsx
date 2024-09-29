import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Badge } from './ui/badge'
import { Input } from './ui/input'

const Post = ({ post }) => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
    const [postLike, setPostLike] = useState(post.likes.length);
    const [comment, setComment] = useState(post.comments);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        setText(inputText.trim() ? inputText : "");
    }

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`http://localhost:8000/api/v1/post/${post._id}/${action}`, { withCredentials: true });
            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error updating like status");
        }
    }

    const commentHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/post/${post._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === post._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText("");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error posting comment");
        }
    }

    const deletePostHandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`, { withCredentials: true })
            if (res.data.success) {
                const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const bookmarkHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/post/${post?._id}/bookmark`, {withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error bookmarking post");
        }
    }

    return (
        <div className='my-8 w-full max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden'>
            <div className='flex items-center justify-between p-4 border-b border-gray-100'>
                <div className='flex items-center gap-3'>
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={post.author?.profilePicture} alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <h1 className="font-semibold text-gray-800">{post.author?.username}</h1>
                        {user?._id === post.author._id && <Badge variant="secondary" className="text-xs">Author</Badge>}
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className='cursor-pointer text-gray-600 hover:text-gray-800' />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">
                        {post?.author?._id !== user?._id && 
                            <Button variant='ghost' className="cursor-pointer w-full text-red-500 font-bold hover:bg-red-50">Unfollow</Button>
                        }
                        <Button variant='ghost' className="cursor-pointer w-full text-indigo-600 hover:bg-indigo-50">Add to favorites</Button>
                        {user && user?._id === post?.author._id && 
                            <Button onClick={deletePostHandler} variant='ghost' className="cursor-pointer w-full text-red-500 hover:bg-red-50">Delete</Button>
                        }
                    </DialogContent>
                </Dialog>
            </div>
            <img
                className='w-full aspect-square object-cover'
                src={post.image}
                alt="post_img"
            />

            <div className='p-4'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-4'>
                        <Button variant="ghost" size="icon" onClick={likeOrDislikeHandler}>
                            {liked 
                                ? <FaHeart size={24} className='text-red-500' /> 
                                : <FaRegHeart size={24} className='text-gray-600 hover:text-gray-800' />
                            }
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => {
                            dispatch(setSelectedPost(post));
                            setOpen(true);
                        }}>
                            <MessageCircle className='text-gray-600 hover:text-gray-800' />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Send className='text-gray-600 hover:text-gray-800' />
                        </Button>
                    </div>
                    <Button variant="ghost" size="icon" onClick={bookmarkHandler}>
                        <Bookmark className='text-gray-600 hover:text-gray-800' />
                    </Button>
                </div>
                <span className='font-medium block mb-2 text-gray-800'>{postLike} likes</span>
                <p className="text-sm text-gray-600 mb-2">
                    <span className='font-medium text-gray-800 mr-2'>{post.author?.username}</span>
                    {post.caption}
                </p>
                {comment.length > 0 && (
                    <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm text-gray-500 hover:text-indigo-600"
                        onClick={() => {
                            dispatch(setSelectedPost(post));
                            setOpen(true);
                        }}
                    >
                        View all {comment.length} comments
                    </Button>
                )}
                <CommentDialog open={open} setOpen={setOpen} />
                <div className='flex items-center justify-between mt-4'>
                    <Input
                        type="text"
                        placeholder='Add a comment...'
                        value={text}
                        onChange={changeEventHandler}
                        className='flex-grow mr-2'
                    />
                    {text && 
                        <Button 
                            onClick={commentHandler} 
                            className='bg-indigo-600 hover:bg-indigo-700 text-white'
                        >
                            Post
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Post