'use client'

import Form from '@components/Form'
import Post from '@custom-types/post'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState<Post>({
    prompt: '',
    tag: ''
  })

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmitting(true)

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {}
  }

  return <Form type='Create' post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />
}

export default CreatePrompt
