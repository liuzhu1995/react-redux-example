import React from 'react';
import { useDispatch } from "react-redux";
import { reactionAdded } from './postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const handleClick = (name) => {
    dispatch(reactionAdded({ id: post.id, reaction:name }));
  }
  const reactionButtons = Object.entries(reactionEmoji).map(([key, emoji]) => (
      <button key={key} type="button" className="muted-button reaction-button" onClick={() => handleClick(key)}>{emoji} { post.reactions[key]}</button>
    ))

  return <div>{reactionButtons}</div>
}

export default ReactionButtons;