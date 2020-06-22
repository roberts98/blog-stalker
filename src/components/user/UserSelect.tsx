import React, { useContext } from 'react';
import Select, { ValueType } from 'react-select';
import styled from 'styled-components';

import { UserContext, User, Actions } from '../../contexts/UserContext';

function UserSelect() {
  const { state, dispatch } = useContext(UserContext);
  const value = state.activeUser
    ? {
        first_name: state.activeUser.first_name,
        last_name: state.activeUser.last_name,
        id: state.activeUser.id,
      }
    : null;

  function handleChange(option: ValueType<User>) {
    if (option) {
      dispatch({ type: Actions.selectActiveUser, payload: option });
    }
  }

  return (
    <Wrapper>
      <h1>Select user</h1>
      <Select
        value={value}
        onChange={(option) => handleChange(option)}
        getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
        getOptionValue={(option) => option.id}
        options={state.users}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px;
  margin-bottom: 20px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
`;

export default UserSelect;
