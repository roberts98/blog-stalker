import React from 'react';
import styled from 'styled-components';

import { Comment } from '../../types/comments';

interface Props {
  comment: Comment;
}

function SingleComment({ comment }: Props) {
  return (
    <Wrapper>
      <h4>{comment.name}</h4>
      <p>{comment.body}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 400px;

  &:not(:last-child) {
    border-bottom: 1px solid #999;
  }
`;

export default SingleComment;
