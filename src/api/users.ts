import axios from 'axios';

import { BASE_URL, commonParams, accessToken } from './common';
import { UpdateUserNamesDTO } from '../types/users';

export async function getUsers() {
  return axios(BASE_URL + '/users', {
    params: {
      ...commonParams,
    },
  });
}

export async function updateUserNames(userId: string, data: UpdateUserNamesDTO) {
  return axios(BASE_URL + '/users/' + userId, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    data,
  });
}
