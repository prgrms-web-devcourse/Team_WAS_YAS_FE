import { UserType } from '@/Models';

const SET_USER = 'user/SET_USER' as const;

export const setUser = (user: UserType) => ({ type: SET_USER, user });

type UserActionType = ReturnType<typeof setUser>;

type UserStateType = UserType;

const initialState: UserStateType = {
  userId: 0,
  name: '',
  nickname: '',
  profileImage: '',
  email: '',
};

export default function user(
  state: UserStateType = initialState,
  action: UserActionType,
) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
