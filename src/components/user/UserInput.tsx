import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { UserContext, Actions } from '../../contexts/UserContext';
import { updateUserNames } from '../../api/users';
import { StyledForm } from '../shared/StyledForm';

function UserInput() {
  const {
    state: { activeUser },
    dispatch,
  } = useContext(UserContext);
  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  function resetState() {
    setFormState({
      first_name: '',
      last_name: '',
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState((formState) => ({
      ...formState,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (activeUser) {
      try {
        setIsLoading(true);
        const res = await updateUserNames(activeUser.id, formState);

        if (res.data._meta.code === 200) {
          dispatch({
            type: Actions.updateActiveUser,
            payload: res.data.result,
          });
          resetState();
        } else {
          throw new Error(res.data._meta.message);
        }
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    }
  }

  if (!activeUser) {
    return null;
  }

  return (
    <Wrapper>
      <h2>Update user first name and last name</h2>
      <StyledForm onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={formState.first_name}
          name="first_name"
          placeholder="user first name"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          value={formState.last_name}
          name="last_name"
          placeholder="user last name"
          required
        />
        <button type="submit">{isLoading ? 'Submitting' : 'Submit'}</button>
      </StyledForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px;
  margin-bottom: 20px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
`;

export default UserInput;
