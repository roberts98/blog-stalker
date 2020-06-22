import React, { useReducer, createContext, useEffect } from 'react';

import { getUsers } from '../api/users';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
}

export enum Actions {
  addUsersSuccess,
  addUsersStarted,
  addUsersFailed,
  selectActiveUser,
  updateActiveUser,
}

interface UserProviderProps {
  children: React.ReactNode;
}

interface State {
  users: User[];
  activeUser: User | null;
  isLoading: boolean;
}

type AddUsersStartedAction = {
  type: Actions.addUsersStarted;
};

type AddUsersFailedAction = {
  type: Actions.addUsersFailed;
  payload: string;
};

type AddUsersSuccessAction = {
  type: Actions.addUsersSuccess;
  payload: User[];
};

type SelectActiveUserAction = {
  type: Actions.selectActiveUser;
  payload: User;
};

type UpdateActiveUserAction = {
  type: Actions.updateActiveUser;
  payload: User;
};

type Action =
  | AddUsersFailedAction
  | AddUsersStartedAction
  | AddUsersSuccessAction
  | SelectActiveUserAction
  | UpdateActiveUserAction;

const initState: State = {
  users: [],
  activeUser: null,
  isLoading: false,
};

export const UserContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initState,
  dispatch: () => null,
});

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case Actions.addUsersStarted:
      return {
        ...state,
        isLoading: true,
      };

    case Actions.addUsersFailed:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case Actions.addUsersSuccess:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };

    case Actions.selectActiveUser:
      return {
        ...state,
        activeUser: action.payload,
      };

    case Actions.updateActiveUser:
      return {
        ...state,
        activeUser: action.payload,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          } else {
            return user;
          }
        }),
      };

    default:
      return state;
  }
}

function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(userReducer, initState);

  useEffect(() => {
    async function fetchUsers() {
      try {
        dispatch({ type: Actions.addUsersStarted });
        const res = await getUsers();
        dispatch({ type: Actions.addUsersSuccess, payload: res.data.result });
      } catch (error) {
        dispatch({ type: Actions.addUsersFailed, payload: error });
      }
    }

    fetchUsers();
  }, []);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
}

export default UserProvider;
