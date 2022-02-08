import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import useSetState from "@/useHooks/useSetState";
import { unwrapResult } from "@reduxjs/toolkit";
import { postAdded, addNewPost } from './postsSlice';

import { selectorAllUsers } from '../users/usersSlice';

const initialState = {
  title: '',
  content: '',
  userId: ''
};

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [state, setState] = useSetState(initialState);
  const users = useSelector(selectorAllUsers);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setState(initialState);
    // dispatch(postAdded(state));
    console.log(state, 'handleSubmit');
    dispatch(addNewPost(state))
  }
  const onSavePostClick = async (event) => {
    event.preventDefault();
    const canSave = Object.values(state).every(Boolean) && addRequestStatus === 'idle';
    // 等待请求时禁用提交功能
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        // 返回一个action
        const resultAction = await dispatch(addNewPost(state));
        console.log(resultAction, 'resultAction');
        // unwrapResult 将返回来自 fulfilled action 的 action.payload 数据，或者如果它是 rejected action 则抛出错误
        unwrapResult(resultAction);
        setState(initialState);
      } catch (e) {
        console.log('新增帖子失败：', e);
      } finally {
        console.log('finally');
        setAddRequestStatus('idle')
      }
    }
  }
  const UsersOptions = users.map(user => (<option key={user.id} value={user.id}>{user.name}</option>));
  return (
    <form onSubmit={onSavePostClick}>
      <label htmlFor="title">
        帖子标题：
        <input type="text" id="title" name="title" value={state.title} onChange={handleChange} />
      </label>
      <label htmlFor="content">
        内容：
        <textarea id="content" name="content" value={state.content} onChange={handleChange} />
      </label>
      <label htmlFor="author">
        作者：
        <select id="author" name="userId" value={state.userId} onChange={handleChange}>
          <option value="" />
          {UsersOptions}
        </select>
      </label>
      <button type="submit">保存帖子</button>
    </form>
  );
}

export default AddPostForm;