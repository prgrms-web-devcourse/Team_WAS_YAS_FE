import { request, authRequest } from './config';
import { AxiosResponse } from 'axios';

// TODO: Promise<AxiosResponse<any, any>>형태로 제네릭으로 데이터, config 타입 명시하기

//! user
interface UserApiType {
  signUp: (userInfo: {
    email: string;
    name: string;
    nickname: string;
    password: string;
    checkPassword: string;
  }) => Promise<AxiosResponse>;
  signIn: (userInfo: {
    email: string;
    password: string;
  }) => Promise<AxiosResponse>;
  getUser: () => Promise<AxiosResponse>;
  updateUser: (userInfo: any) => Promise<AxiosResponse>;
}

export const userApi: UserApiType = {
  signUp: (userInfo) => request.post('/users', userInfo),
  signIn: (userInfo: { email: string; password: string }) =>
    request.post('/users/login', userInfo),
  getUser: () => authRequest.get(`/users`),
  updateUser: (userInfo) => authRequest.put('/users', userInfo),
};

//! routines
// export const createRoutines = (id: number) => request.post('/routines', id);
// export const getRoutines = () => request.get('/routines');
// export const updateRoutines = (id: number, data: any) =>
//   request.put(`/routines/${id}`, data);
// export const deleteRoutines = (id: number) => request.delete(`/routines/${id}`);

//! missions
// export const createMission = (id: number) => request.post('/missions', id);
// export const getMission = () => request.get('/missions');
// export const updateMission = (id: number, data: any) =>
//   request.put(`/missions/${id}`, data);
// export const deleteMission = (id: number) => request.delete(`/missions/${id}`);
