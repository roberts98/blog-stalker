import React, { useState } from 'react';
import styled from 'styled-components';

import { Post } from '../../types/posts';
import SinglePost from './SinglePost';

interface Props {
  posts: Post[];
}

function UsersPosts({ posts }: Props) {
  const [isOneVisible, setIsOneVisible] = useState(true);

  if (!posts.length) {
    return null;
  }

  const visiblePosts = isOneVisible ? [posts[0]] : posts;

  return (
    <Wrapper>
      {visiblePosts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
      {posts.length > 1 && isOneVisible && <h3 onClick={() => setIsOneVisible(false)}>show more posts!</h3>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px;
  margin-bottom: 20px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
`;

export default UsersPosts;
