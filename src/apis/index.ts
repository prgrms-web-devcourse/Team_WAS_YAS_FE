import { request, authRequest } from './axios';

//! user
export const loginUser = () => {};
export const createUser = (user: any) => request.post('/users', user);
export const getUser = (id: string) => request.get(`/users/${id}`);
export const updateUser = (id: string, data: any) =>
  request.put(`/users/${id}`, data);
export const deleteUser = (id: string) => request.delete(`/users/${id}`);

//! routines
export const createRoutines = (id: string) => request.post('/routines', id);
export const getRoutines = () => request.get('/routines');
export const updateRoutines = (id: string, data: any) =>
  request.put('/routines/${id}', data);
export const deleteRoutines = (id: string) => request.delete(`/routines/${id}`);

//! missions
export const createMission = (id: string) => request.post('/missions', id);
export const getMission = () => request.get('/missions');
export const updateMission = (id: string, data: any) =>
  request.put(`/missions/${id}`, data);
export const deleteMission = (id: string) => request.delete(`/missions/${id}`);
