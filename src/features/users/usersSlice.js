import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = [
  { id: '0', name: 'Kijasss', star: 1000000000 },
  { id: '1', name: 'guluguluwater', star: 100000 },
  { id: '2', name: 'Madiamond', star: 100 },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    increment(state, action) {
      const { id } = action.payload
      state.forEach((user) => {
        if (user.id === id) {
          user.star += 1
        }
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // 在原有列表添加
      state.push(...action.payload)
      state.forEach((user) => {
        if (!user.star) {
          user.star = -999
        }
      })
    })
  },
})

export const { increment } = usersSlice.actions

export default usersSlice.reducer

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  // console.log(response.data[0])
  return response.data
})

export const selectAllUsers = (state) => state.users

export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId)
