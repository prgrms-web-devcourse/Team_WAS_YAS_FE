import { AxiosResponse } from 'axios';
import { authRequest } from './config';

interface postApiType {
  createRoutinePost: (routineId: number) => Promise<AxiosResponse>;
  getUnpostedRoutine: () => Promise<AxiosResponse>;
}

const postApi: postApiType = {
  createRoutinePost: (routineId) =>
    authRequest.post(`/routines/${routineId}/posts`),
  getUnpostedRoutine: () => authRequest.get('/routines/posts'),
};

export default postApi;
