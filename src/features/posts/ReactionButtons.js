// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { reactionAdded } from './postsSlice'

// const reactionEmoji = {
//   thumbsUp: '👍',
//   hooray: '🎉',
//   heart: '❤️',
//   rocket: '🚀',
//   eyes: '👀',
// }

// // Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组
// // 其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）

// export const ReactionButtons = ({ post }) => {
//   const dispatch = useDispatch()

//   const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
//     return (
//       <button
//         key={name}
//         type="button"
//         className="muted-button reaction-button"
//         onClick={() => dispatch(reactionAdded{postId: post.id, reaction: name})}
//       >
//         {emoji} {post.reactions[name]}
//       </button>
//     )
//   })

//   return <div>{reactionButtons}</div>
// }
import React from 'react'
import { useDispatch } from 'react-redux'

import { reactionAdded } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
