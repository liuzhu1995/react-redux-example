import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { fetchPosts, selectorAllPosts, selectorStateValue } from "./postsSlice";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectorAllPosts);
  const loading = useSelector((state) => selectorStateValue(state, 'loading'));
  const error = useSelector((state) => selectorStateValue(state, 'error'));
  const status = useSelector((state) => selectorStateValue(state, 'status'));

  console.log(loading, error, status);
  const orderPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const renderedPosts = orderPosts.map(post => (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <Link to={`/posts/${post.id}`}>View Post</Link>
      </article>
    ))

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (error) {
    return <div>error message: {error}</div>
  }

  if (loading) {
    return <div>loading...</div>
  }
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList;