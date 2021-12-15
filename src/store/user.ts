import { UserType } from '@/Models';

const SET_USER = 'user/SET_USER' as const;

// ?: eslint에 걸리기 때문에 setUser 반환타입 임시 설정
export const setUser = (user: UserType): { type: string; user: UserType } => ({
  type: SET_USER,
  user,
});

type UserActionType = ReturnType<typeof setUser>;

type UserStateType = UserType;

// TODO: 초기값 안정적으로 옵셔널하게 변경하기
const initialState: UserStateType = {
  userId: 0,
  name: '',
  nickname: '',
  profileImage: '',
  email: '',
};

const user = (
  state: UserStateType = initialState,
  action: UserActionType,
): UserStateType => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

export default user;
