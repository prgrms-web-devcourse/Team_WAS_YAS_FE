import { AxiosResponse } from 'axios';
import { authRequest } from './config';

interface commentApiType {
  createComment: (postId: number) => Promise<AxiosResponse>;
  updateComment: (commentId: number) => Promise<AxiosResponse>;
  deleteComment: (commentId: number) => Promise<AxiosResponse>;
}

const postApi: commentApiType = {
  createComment: (postId: number) => authRequest(`/posts/${postId}/comments`),
  updateComment: (commentId: number) => authRequest(`/comments/${commentId}`),
  deleteComment: (commentId: number) => authRequest(`/comments/${commentId}`),
};

export default commentApiType;
