import PromptCard from './PromptCard'

type Props = {
  name: string
  desc: string
  data: any[]
  handleEdit: (post: any) => void
  handleDelete: (post: any) => void
}

const Profile = ({ data, desc, handleDelete, handleEdit, name }: Props) => {
  return (
    <div className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </div>
  )
}

export default Profile
