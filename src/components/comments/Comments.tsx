import React from 'react';

import { Comment } from '../../types/comments';
import SingleComment from './SingleComment';

interface Props {
  comments: Comment[];
}

function Comments({ comments }: Props) {
  return (
    <div>
      {comments.map((comment) => (
        <SingleComment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;
