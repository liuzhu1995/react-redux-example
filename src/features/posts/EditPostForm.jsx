import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSetState } from '@/useHooks';
import { selectorPostById, postUpdated } from './postsSlice';

const EditPostForm = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const history = useHistory();
  const currentPost = useSelector(state => selectorPostById(state, postId));
  const [state, setState] = useSetState(currentPost);


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postUpdated(state));
    history.push(`/posts/${postId}`);

  }
  const handleChange = (event) => {
    setState({
      [event.target.name]: event.target.value,
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">
        帖子标题：
        <input type="text" id="title" name="title" value={state.title} onChange={handleChange} />
      </label>
      <label htmlFor="content">
        内容：
        <textarea id="content" name="content" value={state.content} onChange={handleChange} />
      </label>
      <button type="submit">保存帖子</button>
    </form>
  )
}

export default EditPostForm;