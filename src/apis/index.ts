import { request, authRequest } from './axios';

//! user

export const userApi = {
  signUp: (userInfo: {
    email: string;
    name: string;
    nickname: string;
    password: string;
    checkPassword: string;
  }) => request.post('/users', userInfo),
  signIn: (userInfo: { email: string; password: string }) =>
    request.post('/users/login', userInfo),
  getUser: () => authRequest.get(`/users`),
  updateUser: (userInfo: any) => authRequest.put('/users', userInfo),
};

//! routines
export const createRoutines = (id: number) => request.post('/routines', id);
export const getRoutines = () => request.get('/routines');
export const updateRoutines = (id: number, data: any) =>
  request.put(`/routines/${id}`, data);
export const deleteRoutines = (id: number) => request.delete(`/routines/${id}`);

//! missions
export const createMission = (id: number) => request.post('/missions', id);
export const getMission = () => request.get('/missions');
export const updateMission = (id: number, data: any) =>
  request.put(`/missions/${id}`, data);
export const deleteMission = (id: number) => request.delete(`/missions/${id}`);
