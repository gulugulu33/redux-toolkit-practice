import React, { memo } from 'react'
import { useSelector } from 'react-redux'

const PostAuthor = memo(({ userId }) => {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  )
  // console.log(author)
  return (
    <span className="grey">by {author ? author.name : 'Unknown author'}</span>
  )
})

export default PostAuthor
