import { userApi } from '@/apis';

export const isLogin = async () => {
  const token = sessionStorage.getItem('YAS_USER_TOKEN');
  if (!token) return false;

  try {
    await userApi.getUser();
    return true;
  } catch (error) {
    return false;
  }
};
