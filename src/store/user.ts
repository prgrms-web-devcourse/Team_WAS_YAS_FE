import { UserType } from '@/Models';

interface UserActionType {
  type: string;
  user: UserType;
}

const SET_USER = 'user/SET_USER';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setUser = (user: UserType) => ({ type: SET_USER, user });

/* 초기 상태 선언 */
const initialState: UserType = {
  userId: 0,
  name: '',
  nickname: '',
  profileImage: '',
  email: '',
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function counter(state = initialState, action: UserActionType) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
