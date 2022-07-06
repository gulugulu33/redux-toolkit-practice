import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = [
  { id: '0', name: 'Kijasss' },
  { id: '1', name: 'guluguluwater' },
  { id: '2', name: 'Madiamond' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload)
  },
})

export default usersSlice.reducer

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})
