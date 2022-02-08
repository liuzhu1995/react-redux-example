import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await fetch('api/users');
    const json = await response.json();
    console.log(json, 'users');
    return json.users;
  } catch(e) {
    throw new Error(e);
  }
})
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => action.payload
  }
})

export const selectorAllUsers = state => state.users;
export const selectorUserById = ({ users }, userId) => users.find(user => user.id === userId)
export default usersSlice.reducer;