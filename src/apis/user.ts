import { request, authRequest } from './config';
import { AxiosResponse } from 'axios';

// TODO: Promise<AxiosResponse<any, any>>형태로 제네릭으로 데이터, config 타입 명시하기
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
  updateUser: (
    userInfo: { nickname: string },
    imageFile: File,
  ) => Promise<AxiosResponse>;
}

const userApi: UserApiType = {
  signUp: (userInfo) => request.post('/users', userInfo),
  signIn: (userInfo: { email: string; password: string }) =>
    request.post('/users/login', userInfo),
  getUser: () => authRequest.get(`/users`),
  updateUser: (userInfo, imageFile) => {
    const formData = new FormData();
    formData.append('userUpdateRequest', JSON.stringify(userInfo));
    formData.append('image', imageFile);
    return authRequest.put('/users', formData);
  },
};

export default userApi;
