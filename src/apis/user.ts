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
  updateUser: (formData: FormData) => Promise<AxiosResponse>;
  validateEmail: (email: string) => Promise<AxiosResponse>;
  updatePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<AxiosResponse>;
}

const userApi: UserApiType = {
  signUp: (userInfo) => request.post('/users', userInfo),
  signIn: (userInfo: { email: string; password: string }) =>
    request.post('/users/login', userInfo),
  getUser: () => authRequest.get(`/users`),
  updateUser: (formData) => {
    return authRequest.put('/users', formData);
  },
  validateEmail: (email) => {
    return request.get('/users/email', { params: { value: email } });
  },
  updatePassword: (currentPassword: string, newPassword: string) => {
    return authRequest.put('/users/password', {
      newPassword: newPassword,
      newPasswordCheck: newPassword,
      nowPassword: currentPassword,
    });
  },
};

export default userApi;
