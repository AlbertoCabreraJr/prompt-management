'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

import React from 'react'
import axios from 'axios'

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])

  const handleEdit = (post: any) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
    if (hasConfirmed) {
      try {
        await axios.delete(`/api/prompt/${post._id.toString()}`)
        // @ts-ignore
        const filteredPosts = posts.filter((p) => p._id !== post._id)
        setPosts(filteredPosts)
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(`/api/users/${session?.user.id}/posts`)
      setPosts(data)
    }

    if (session?.user.id) {
      fetchPosts()
    }
  }, [])

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
