// import { request, authRequest } from './config';

import { AxiosResponse } from 'axios';
import { authRequest } from './config';

interface MissionApiType {
  createMission: (
    routineId: number,
    missionInfo: {
      name: string;
      color: string;
      emoji: string;
      durationGoalTime: number;
      orders: number;
    },
  ) => Promise<AxiosResponse>;
  updateMission: (
    routineId: number,
    missionInfo: {
      missionId: number;
      orders: number;
    },
  ) => Promise<AxiosResponse>;
  deleteMission: (missionId: number) => Promise<AxiosResponse>;
}

const missionApi: MissionApiType = {
  createMission: (routineId, missionInfo) =>
    authRequest.post(`/routines/${routineId}/missions`, missionInfo),
  updateMission: (routineId, missionInfo) =>
    authRequest.put(`/routines/${routineId}/missions`, missionInfo),
  deleteMission: (missionId) =>
    authRequest.delete(`/routines/missions/${missionId}`),
};

export default missionApi;
