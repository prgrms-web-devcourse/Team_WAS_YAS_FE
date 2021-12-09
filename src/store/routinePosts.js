const GET_ROUTINE_POSTS = 'routine/GET_ROUTINE_POSTS';
const CREATE_ROUTINE_POSTS = 'routine/CREATE_ROUTINE_POSTS';
const UPDATE_ROUTINE_POSTS = 'routine/UPDATE_ROUTINE_POSTS';
const DELETE_ROUTINE_POSTS = 'routine/DELETE_ROUTINE_POSTS';

// interface actionType {
//   type: string;
//   routinePosts: {};
// }

export const getRoutine = () => ({
  type: GET_ROUTINE_POSTS,
  routinePosts: {},
});
export const createRoutine = () => ({
  type: CREATE_ROUTINE_POSTS,
  routinePosts: {},
});
export const updateRoutine = () => ({
  type: UPDATE_ROUTINE_POSTS,
  routinePosts: {},
});
export const deleteRoutine = () => ({
  type: DELETE_ROUTINE_POSTS,
  routinePosts: {},
});

const initialState = [{}];

const routinePosts = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROUTINE_POSTS:
      return state;
    case CREATE_ROUTINE_POSTS:
      return state;
    case UPDATE_ROUTINE_POSTS:
      return state;
    case DELETE_ROUTINE_POSTS:
      return state;
    default:
      return state;
  }
};

export default routinePosts;
