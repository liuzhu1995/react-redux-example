import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import AddPostForm from "./AddPostForm";
import PostsList from "./PostsList";
import { fetchUsers } from '../users/usersSlice';

const Posts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <AddPostForm/>
      <PostsList/>
    </div>
  )
}

export default Posts;