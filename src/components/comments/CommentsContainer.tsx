import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getComments } from '../../api/comments';
import { Comment } from '../../types/comments';
import Comments from './Comments';
import AddComment from './AddComment';

interface Props {
  postId: string;
}

function CommentsContainer({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function addComment(comment: Comment) {
    setComments([...comments, comment]);
  }

  useEffect(() => {
    async function fetchComments() {
      try {
        setIsLoading(true);
        const res = await getComments(postId);

        if (res.data._meta.code === 200) {
          setComments(res.data.result);
        } else {
          throw new Error(res.data._meta.message);
        }
      } catch (error) {
        alert(error);
      }

      setIsLoading(false);
    }

    fetchComments();
  }, [postId]);

  return (
    <Wrapper>
      {isLoading ? 'Loading...' : <Comments comments={comments} />}
      <AddComment onSubmit={addComment} postId={postId} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px;
  margin-bottom: 20px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
`;

export default CommentsContainer;
