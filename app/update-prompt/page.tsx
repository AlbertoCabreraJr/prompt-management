'use client'

import Form from '@components/Form'
import Post from '@custom-types/post'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

const UpdatePrompt = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState<Post>({
    prompt: '',
    tag: ''
  })

  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) {
      return alert('Prompt ID not found!')
    }

    try {
      await axios.patch(`/api/prompt/${promptId}`, {
        prompt: post.prompt,
        tag: post.tag
      })

      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const getPromptDetails = async () => {
      const { data } = await axios.get(`/api/prompt/${promptId}`)

      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if (promptId) {
      getPromptDetails()
    }
  }, [promptId])

  return <Form type='Edit' post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
}

export default UpdatePrompt
