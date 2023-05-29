import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Inspire Boundless Ideas
        <br />
        <span className='orange_gradient text-center'>Empowering Users to Shape Conversations</span>
      </h1>
      <p className='desc text-center'>
        PromptVerse empowers users to create, edit, and manage prompts for ChatGPT and related platforms. Take control
        of your AI-driven conversations and unleash your creativity with PromptVerse.{' '}
      </p>

      <Feed />
    </section>
  )
}

export default Home
