import { userApi } from '@/apis';

// TODO: 토큰 유효성 검사 api로 대체하기
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
