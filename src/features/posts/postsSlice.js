import { createAsyncThunk, createSlice, nanoid, createSelector } from "@reduxjs/toolkit";
import enhancedFetch from '../../api/enhancedFetch';

const initialState = {
  posts: [],
  loading: true,
  error: null,
  status: '',
};
const initialReactions = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await enhancedFetch('/api/posts');
  const data = await response.json();
  return data.posts;
});
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await enhancedFetch('/api/posts', { method: 'POST', body: JSON.stringify({ post: initialPost }) });
  const json = await response.json();
  console.log(json, 'addNewPost');
  return json.posts;
});
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.result.push(action.payload);
      },
      prepare({ title, content, userId }) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            reactions: initialReactions,
            title,
            content,
            user: userId,
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content }  = action.payload;
      const currentPost = state.posts.find(post => post.id === id);
      if (currentPost) {
        currentPost.title = title;
        currentPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { id, reaction } = action.payload;
      const currentPost = state.posts.find(post => post.id === id);
      if (currentPost) {
        currentPost.reactions[reaction] += 1;
      }
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = 'succeed';
      state.loading = false;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },
    [addNewPost.fulfilled]: (state, action) => {
      console.log(action.payload, 'addNewPost.fulfilled');
      if (action.payload) {
        state.posts.push(action.payload);
      }

    }
  }
});
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const selectorAllPosts = ({ posts }) =>  posts.posts;
export const selectorPostById = (state, postId) => {
  const { posts } = state;
  return posts.posts.find(post => post.id === postId)
}
export const selectorStateValue = (state, key) => state.posts[key];

// createSelector将一个或多个"输入选择器"函数作为参数，外加一个"输出选择器"函数
// 当我们调用 时，会将所有参数传递到每个输入选择器中。无论这些输入选择器返回什么，都将成为输出选择器的参数
// 多次调用 只有在发生更改或已更改时 才会重新运行输出选择器
export const selectorPostsByUser = createSelector(
  [selectorAllPosts, (state, args) => args],
  (posts, { postId, userId }) => {
    console.log({postId, userId }, 'args');
    return  posts.find(post => post.id === postId);
  },
  )

export default postsSlice.reducer;