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
      missionOrders: { missionId: number; orders: number }[];
    },
  ) => Promise<AxiosResponse>;
  deleteMission: (
    routindId: number,
    missionId: number,
  ) => Promise<AxiosResponse>;
}

const missionApi: MissionApiType = {
  createMission: (routineId, missionInfo) =>
    authRequest.post(`/routines/${routineId}/missions`, missionInfo),
  updateMission: (routineId, missionInfo) =>
    authRequest.put(`/routines/${routineId}/missions`, missionInfo),
  deleteMission: (routindId, missionId) =>
    authRequest.delete(`/routines/${routindId}/missions/${missionId}`),
};

export default missionApi;
