import { UserType } from '@/Models';

interface UserActionType {
  type: string;
  user: UserType;
}

const SET_USER = 'user/SET_USER';

export const setUser = (user: UserType) => ({ type: SET_USER, user });

const initialState: UserType = {
  userId: 0,
  name: '',
  nickname: '',
  profileImage: '',
  email: '',
};

export default function user(state = initialState, action: UserActionType) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
