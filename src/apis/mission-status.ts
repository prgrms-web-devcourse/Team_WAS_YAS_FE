// import { request, authRequest } from './config';

import { AxiosResponse } from 'axios';
import { authRequest } from './config';

interface MissionStatusApiType {
  createMissionStatus: (routineId: number) => Promise<AxiosResponse>;
  updateMissionStatus: (
    routineId: number,
    missionInfo: {
      routineStatusId: number;
      missionStatusId: number;
      orders: number;
      startTime?: string;
      endTime?: string;
      userDurationTime?: number;
    },
  ) => Promise<AxiosResponse>;
  getMissionStatus: (missionId: number) => Promise<AxiosResponse>;
}

const missionStatusApi: MissionStatusApiType = {
  createMissionStatus: (routineId) =>
    authRequest.post(`/routines/${routineId}/mission-status`),
  updateMissionStatus: (routineId, missionInfo) =>
    authRequest.put(`/routines/${routineId}/mission-status`, missionInfo),
  getMissionStatus: (routineId) =>
    authRequest.get(`/routines/${routineId}/mission-status`),
};

export default missionStatusApi;
