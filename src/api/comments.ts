import axios from 'axios';

import { BASE_URL, commonParams, accessToken } from './common';
import { CommentDTO } from '../types/comments';

export async function getComments(postId: string) {
  return axios(BASE_URL + '/comments', {
    method: 'GET',
    params: {
      ...commonParams,
      post_id: postId,
    },
  });
}

export async function addComment(data: CommentDTO) {
  return axios(BASE_URL + '/comments', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    data,
  });
}
