import { request, authRequest } from './axios';

//! user

export const userApi = {
  signUp: (userInfo) => request.post('/users', userInfo),
  signIn: (userInfo) => request.post('/users/login', userInfo),
  getUser: () => authRequest.get(`/users`),
  updateUser: (userInfo) => authRequest.put('/users', userInfo),
};

//! routines
export const createRoutines = (id) => request.post('/routines', id);
export const getRoutines = () => request.get('/routines');
export const updateRoutines = (id, data) =>
  request.put(`/routines/${id}`, data);
export const deleteRoutines = (id) => request.delete(`/routines/${id}`);

//! missions
export const createMission = (id) => request.post('/missions', id);
export const getMission = () => request.get('/missions');
export const updateMission = (id, data) => request.put(`/missions/${id}`, data);
export const deleteMission = (id) => request.delete(`/missions/${id}`);
