import React, { useContext } from 'react';

import UserSelect from './components/user/UserSelect';
import { UserContext } from './contexts/UserContext';
import UserPostsContainer from './components/posts/UserPostsContainer';
import UserInput from './components/user/UserInput';
import Spinner from './components/shared/Spinner';

function App() {
  const {
    state: { isLoading },
  } = useContext(UserContext);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <UserSelect />
      <UserInput />
      <UserPostsContainer />
    </>
  );
}

export default App;
