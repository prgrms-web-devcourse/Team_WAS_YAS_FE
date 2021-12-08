const CREATE_USER = 'user/CREATE_USER';
const UPDATE_USER = 'user/UPDATE_USER';
const DELETE_USER = 'user/DELETE_USER';

// interface actionType {
//   type: string;
//   user: {};
// }

export const createRoutine = () => ({
  type: CREATE_USER,
  user: {},
});
export const updateRoutine = () => ({
  type: UPDATE_USER,
  user: {},
});
export const deleteRoutine = () => ({
  type: DELETE_USER,
  user: {},
});

const initialState = [{}];

const user = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return state;
    case UPDATE_USER:
      return state;
    case DELETE_USER:
      return state;
    default:
      return state;
  }
};

export default user;
