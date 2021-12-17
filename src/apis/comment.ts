import { AxiosResponse } from 'axios';
import { authRequest } from './config';

interface commentApiType {
  createComment: (postId: number, content: string) => Promise<AxiosResponse>;
  updateComment: (commentId: number, content: string) => Promise<AxiosResponse>;
  deleteComment: (commentId: number) => Promise<AxiosResponse>;
}

const commentApi: commentApiType = {
  createComment: (postId, content) =>
    authRequest.post(`/posts/${postId}/comments`, { content }),
  updateComment: (commentId, content) =>
    authRequest.patch(`/comments/${commentId}`, { content }),
  deleteComment: (commentId) => authRequest.delete(`/comments/${commentId}`),
};

export default commentApi;
