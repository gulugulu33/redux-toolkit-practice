import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Kijasss' },
  { id: '1', name: 'guluguluwater' },
  { id: '2', name: 'Madiamond' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer
