import React from 'react';
import { useSelector } from "react-redux";
import { selectorUserById } from '../users/usersSlice';

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectorUserById(state, userId));
  return <div>By {author ? author.name : 'Unknown author'}</div>
}

export default PostAuthor;