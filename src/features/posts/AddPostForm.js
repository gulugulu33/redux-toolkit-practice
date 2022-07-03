import { nanoid } from "@reduxjs/toolkit"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { postAdded } from './postsSlice'

export const AddPostFrom = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useDispatch()

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onSavePostClicked = () => {
    if(title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content
        })
      )
      setTitle('')
      setContent('')
    }
  }

  return (
    <section>
      <h2>添加新帖子</h2>
        <from>
          <label htmlFor="postTitle">帖子标题:</label>
          <input type='text'
                 id='postTitle'
                 name='postTitle'
                 value={title}
                 onChange={onTitleChanged}
           />
           <label htmlFor='postContent'>内容</label>
           <textarea id='postContent'
                     name='postContent'
                     value={content}
                     onChange={onContentChanged}
           />
           <button type='button' onClick={onSavePostClicked}>保存帖子</button>
        </from>
    </section>
  )
}