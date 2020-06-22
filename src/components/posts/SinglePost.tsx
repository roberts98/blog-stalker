import React, { useState } from 'react';
import styled from 'styled-components';

import CommentsContainer from '../comments/CommentsContainer';
import { Post } from '../../types/posts';

interface Props {
  post: Post;
}

function SinglePost({ post }: Props) {
  const [showComments, setShowComments] = useState(false);

  function handleCommentSwitch() {
    setShowComments(true);
  }

  return (
    <Wrapper>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      {!showComments && <p onClick={handleCommentSwitch}>Show comments</p>}
      {showComments && <CommentsContainer postId={post.id} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-bottom: 1px solid #999;
`;

export default SinglePost;
