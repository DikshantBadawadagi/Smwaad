import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store=>store.auth);
  const {posts} = useSelector(store=>store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  }

  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="bg-white rounded-2xl shadow-lg max-w-md w-full mx-auto">
        <DialogHeader className='text-center font-bold text-xl text-indigo-800 mb-4'>Create New Post</DialogHeader>
        <div className='flex gap-4 items-center mb-4'>
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='font-semibold text-sm text-gray-800'>{user?.username}</h1>
            <span className='text-gray-600 text-xs'>Bio here...</span>
          </div>
        </div>
        <Textarea 
          value={caption} 
          onChange={(e) => setCaption(e.target.value)} 
          className="focus-visible:ring-indigo-300 border-gray-200 rounded-lg mb-4" 
          placeholder="Write a caption..." 
        />
        {imagePreview ? (
          <div className='w-full h-64 flex items-center justify-center mb-4'>
            <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-lg shadow-md' />
          </div>
        ) : (
          <div className='w-full h-64 flex items-center justify-center mb-4 bg-gray-100 rounded-lg'>
            <ImageIcon className='w-16 h-16 text-gray-400' />
          </div>
        )}
        <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
        <Button 
          onClick={() => imageRef.current.click()} 
          className='w-full mb-4 bg-indigo-600 hover:bg-indigo-700 text-white'
        >
          Select from computer
        </Button>
        {imagePreview && (
          loading ? (
            <Button disabled className="w-full bg-gray-400">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button 
              onClick={createPostHandler} 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Post
            </Button>
          )
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost