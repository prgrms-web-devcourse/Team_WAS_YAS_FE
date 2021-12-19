import { userApi } from '@/apis';

const isLoggedIn = async (): Promise<boolean> => {
  const token = sessionStorage.getItem('YAS_USER_TOKEN');
  if (!token) return false;
  const userInfo = await userApi.getUser();
  console.log(userInfo);
  if (!userInfo) return false;
  return true;
};

export default { isLoggedIn };
