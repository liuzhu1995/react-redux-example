import React  from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { selectorPostById, selectorPostsByUser } from './postsSlice';

const SinglePostPage = () => {
  const { postId } = useParams();

  // const post = useSelector(state => selectorPostById(state, postId));
  // const post = useSelector(state => selectorPostsByUser(state, postId, 798))
  const post = useSelector(state => selectorPostsByUser(state, { postId, userId: 798 }))
  console.log(post);

  if (!post) {
    return (
      <section>
        <h2>页面未找到！</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <TimeAgo timestamp={post.date} />
        <PostAuthor userId={post.userId} />
        <ReactionButtons post={post} />
        <Link to={`/editPost/${postId}`} className="button">Edit Post</Link>
      </article>
    </section>
  )
}

export default SinglePostPage;