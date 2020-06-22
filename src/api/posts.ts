import axios from 'axios';

import { BASE_URL, commonParams } from './common';

export async function getPosts(userId: string) {
  return axios(BASE_URL + '/posts', {
    params: {
      ...commonParams,
      user_id: userId,
    },
  });
}
