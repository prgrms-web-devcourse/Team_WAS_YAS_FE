import { AxiosResponse } from 'axios';
import { authRequest } from './config';

interface commentApiType {
  createComment: (postId: number, content: string) => Promise<AxiosResponse>;
  updateComment: (commentId: number) => Promise<AxiosResponse>;
  deleteComment: (commentId: number) => Promise<AxiosResponse>;
}

const commentApi: commentApiType = {
  createComment: (postId: number, content) =>
    authRequest.post(`/posts/${postId}/comments`, { content }),
  updateComment: (commentId: number) =>
    authRequest.patch(`/comments/${commentId}`),
  deleteComment: (commentId: number) =>
    authRequest.delete(`/comments/${commentId}`),
};

export default commentApi;
