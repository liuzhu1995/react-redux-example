import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    result: null,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    userLoaded: (state, action) => {
      state.result = action.payload.response;
    }
  }
});
export const { increment, decrement, userLoaded,incrementByAmount } = slice.actions;

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000);
}

export const fetchUserById = (userId) => async (dispatch, getState) => {
    try {
      const response = await fetch(`http://jsonplaceholder.typicode.com/posts/${userId}`);
      const json = await response.json();
      dispatch(userLoaded({ response: json }));
    } catch (e) {
      throw new Error(e);
    }
}

export const selectorCount = state => {
  console.log(state);
  return state.counter.value
};
export const selectorUser = state => state.counter.result;

export default slice.reducer;