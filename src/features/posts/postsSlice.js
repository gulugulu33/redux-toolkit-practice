import {
  createAsyncThunk,
  createSlice,
  nanoid,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

// “范式化 state”是指：

// 我们 state 中的每个特定数据只有一个副本，不存在重复。
// 已范式化的数据保存在查找表中，其中项目 ID 是键，项本身是值。
// 也可能有一个特定项用于保存所有 ID 的数组。

// 这使得通过 ID 查找特定的“用户”对象变得简单，不需遍历数组中其他的用户对象：
// const userId = 'user2'
// const userObject = state.users.entities[userId]

// 使用' createEntityAdapter '管理范式化 state

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

// getInitialState 函数，它生成一个空的 {ids: [], entities: {}} 对象。
// 您可以传递更多字段给 getInitialState，这些字段将会被合并。

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded(state, action) {
    //   state.push(action.payload)
    // },
    postAdded: {
      reducer: (state, action) => {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0, 
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        // upsertMany 函数将根据匹配的 ID 将它们合并在一起。
        // state.posts = state.posts.concat(action.payload)
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // 我们需要将一个新的帖子对象添加到我们的 state 中。
      // 我们可以直接将 adapter 用作 reducer，
      // 所以我们将传递 postsAdapter.addOne 作为 reducer 函数来处理该操作。
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

// 最后，我们可以用 postsAdapter.getSelectors 生成的 selector 函数
// 替换旧的手写的 selectAllPosts 和 selectPostById selector 函数。

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  // console.log(response.data[0].user.name)
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    // We send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', initialPost)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)
