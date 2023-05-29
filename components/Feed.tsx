'use client'

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import axios from 'axios'

type PromptCardListProps = {
  data: any[]
  handleTagClick: () => void
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('/api/prompt')
      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <section className='feed'>
      {/* <form className='relative w-fule flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form> */}

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed
