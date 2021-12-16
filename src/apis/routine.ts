import { AxiosResponse } from 'axios';
import { authRequest } from './config';

interface RoutineApiType {
  createRoutine: (routineInfo: {
    name: string;
    routineCategory: string[];
    startGoalTime: string;
    durationGoalTime: number;
    weeks: string[];
    emoji: string;
    color: string;
  }) => Promise<AxiosResponse>;
  getRoutines: () => Promise<AxiosResponse>;
  getFinishedRoutines: () => Promise<AxiosResponse>;
  getNotFinishedRoutines: () => Promise<AxiosResponse>;
  getRoutine: (routineId: number) => Promise<AxiosResponse>;
  deleteRoutine: (routineId: number) => Promise<AxiosResponse>;
  updateRoutine: (
    routineId: number,
    routineInfo: { weeks: string[] },
  ) => Promise<AxiosResponse>;
}

const routineApi: RoutineApiType = {
  createRoutine: (routineInfo) => authRequest.post('/routines', routineInfo),
  getRoutines: () => authRequest.get('/routines'),
  getFinishedRoutines: () => authRequest.get('/routines?status=finish'),
  getNotFinishedRoutines: () => authRequest.get('/routines?status=not_finish'),
  getRoutine: (routineId) => authRequest.get(`/routines/${routineId}/missions`),
  deleteRoutine: (routineId) => authRequest.delete(`/routines/${routineId}`),
  updateRoutine: (routineId, routineInfo) =>
    authRequest.put(`/routines/${routineId}`, routineInfo),
};

export default routineApi;
