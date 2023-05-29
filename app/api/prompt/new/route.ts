import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'
import { NextApiRequest, NextApiResponse } from 'next'

type CreatePostBody = {
  userId: string
  prompt: string
  tag: string
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: CreatePostBody
}

export const POST = async (request: ExtendedNextApiRequest) => {
  try {
    // @ts-ignore
    const { userId, prompt, tag } = await request.json()
    await connectToDB()
    const newPrompt = new Prompt({ creator: userId, prompt, tag })

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 })
  }
}
