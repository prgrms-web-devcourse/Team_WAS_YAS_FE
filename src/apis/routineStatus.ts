import { AxiosResponse } from 'axios';
import { authRequest } from './config';

interface RoutineStatusApiType {
  getRoutineStatusByDate: (date: string) => Promise<AxiosResponse>;
}

const routineStatusApi: RoutineStatusApiType = {
  getRoutineStatusByDate: (date) =>
    authRequest.get('/routines/routineStatus', { params: { date } }),
};

export default routineStatusApi;
