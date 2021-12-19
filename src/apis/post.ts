import { AxiosResponse } from 'axios';
import { authRequest, request } from './config';

interface postApiType {
  createRoutinePost: (routineId: number) => Promise<AxiosResponse>;
  getUnpostedRoutine: () => Promise<AxiosResponse>;
  getPosts: () => Promise<AxiosResponse>;
  getPostsByPopular: () => Promise<AxiosResponse>;
  getMyPosts: () => Promise<AxiosResponse>;
  getPost: (postId: number) => Promise<AxiosResponse>;
  deletePost: (postId: number) => Promise<AxiosResponse>;
}

const postApi: postApiType = {
  createRoutinePost: (routineId) =>
    authRequest.post(`/routines/${routineId}/posts`),
  getUnpostedRoutine: () => authRequest.get('/routines/posts'),
  getPosts: () => request.get(`/posts`),
  getPostsByPopular: () => request.get(`/posts/popular`),
  getMyPosts: () => authRequest.get('/posts/my'),
  getPost: (postId) => authRequest.get(`/posts/${postId}`),
  deletePost: (postId) => authRequest.delete(`/posts/${postId}`),
};

export default postApi;
