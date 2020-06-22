import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../../contexts/UserContext';
import { Post } from '../../types/posts';
import UsersPosts from './UserPosts';
import { getPosts } from '../../api/posts';
import Spinner from '../shared/Spinner';

function UserPostsContainer() {
  const {
    state: { activeUser },
  } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      if (activeUser?.id) {
        try {
          setIsLoading(true);
          const res = await getPosts(activeUser.id);

          if (res.data._meta.code === 200) {
            setPosts(res.data.result);
          } else {
            throw new Error(res.data._meta.message);
          }
        } catch (error) {
          alert(error);
        }

        setIsLoading(false);
      }
    }
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser?.id]);

  if (isLoading) {
    return <Spinner />;
  }

  return <UsersPosts posts={posts} />;
}

export default UserPostsContainer;
