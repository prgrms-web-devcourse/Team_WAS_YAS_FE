import { AxiosResponse } from 'axios';
import { authRequest, request } from './config';

interface likeApiType {
  createPostLike: (postId: number) => Promise<AxiosResponse>;
  deletePostLike: (postId: number) => Promise<AxiosResponse>;
  createCommentLike: (commentId: number) => Promise<AxiosResponse>;
  deleteCommentLike: (commentId: number) => Promise<AxiosResponse>;
}

const likeApi: likeApiType = {
  createPostLike: (postId: number) =>
    authRequest.post(`/posts/${postId}/likes`),
  deletePostLike: (postId: number) =>
    authRequest.delete(`/posts/${postId}/likes`),
  createCommentLike: (commentId: number) =>
    authRequest.post(`/posts/comments/${commentId}/likes`),
  deleteCommentLike: (commentId: number) =>
    authRequest.delete(`/posts/comments/${commentId}/likes`),
};

export default likeApi;
