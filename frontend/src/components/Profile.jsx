import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useGetUserProfile  from '@/hooks/useGetUserProfile'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AtSign, Heart, MessageCircle, Grid, Bookmark, Film, Tag } from 'lucide-react'

const Profile = () => {
  const { id: userId } = useParams()
  const { userProfile } = useGetUserProfile(userId)
  const [activeTab, setActiveTab] = useState('posts')

  const { user } = useSelector((store) => store.auth)

  const isLoggedInUserProfile = user?._id === userProfile?._id
  const isFollowing = user?.following?.includes(userProfile?._id)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const displayedPosts = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks

  const tabs = [
    { id: 'posts', label: 'POSTS', icon: Grid },
    { id: 'saved', label: 'SAVED', icon: Bookmark },
    { id: 'reels', label: 'REELS', icon: Film },
    { id: 'tags', label: 'TAGS', icon: Tag },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <Avatar className="h-32 w-32 md:h-40 md:w-40">
          <AvatarImage src={userProfile?.profilePicture} alt="Profile" />
          <AvatarFallback>{userProfile?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-2xl font-bold">{userProfile?.username}</h1>
            {isLoggedInUserProfile ? (
              <>
                <Link to="/account/edit">
                  <Button variant="outline">Edit profile</Button>
                </Link>
                <Button variant="outline">View archive</Button>
                <Button variant="outline">Ad tools</Button>
              </>
            ) : (
              <>
                <Button variant={isFollowing ? "outline" : "default"}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
                <Button variant="outline">Message</Button>
              </>
            )}
          </div>
          <div className="flex gap-6 text-sm">
            <span><strong>{userProfile?.posts?.length}</strong> posts</span>
            <span><strong>{userProfile?.followers?.length}</strong> followers</span>
            <span><strong>{userProfile?.following?.length}</strong> following</span>
          </div>
          <div className="space-y-2">
            <p className="font-medium">{userProfile?.bio || 'No bio available'}</p>
            <Badge variant="secondary" className="flex items-center w-fit">
              <AtSign className="h-4 w-4 mr-1" />
              {userProfile?.username}
            </Badge>
            <p>🤯 Developer of Lord of The Pings</p>
            <p>🤯 Turning code into fun</p>
            <p>Social Activist</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
                activeTab === tab.id ? 'border-t-2 border-black' : ''
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {displayedPosts?.map((post) => (
            <div key={post._id} className="relative group aspect-square">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-6 text-white">
                  <span className="flex items-center">
                    <Heart className="h-6 w-6 mr-2" />
                    {post.likes.length}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="h-6 w-6 mr-2" />
                    {post.comments.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile