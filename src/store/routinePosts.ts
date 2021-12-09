import { RoutinePostType } from './types';

const GET_ROUTINE_POSTS = 'routine/GET_ROUTINE_POSTS';
const CREATE_ROUTINE_POSTS = 'routine/CREATE_ROUTINE_POSTS';
const UPDATE_ROUTINE_POSTS = 'routine/UPDATE_ROUTINE_POSTS';
const DELETE_ROUTINE_POSTS = 'routine/DELETE_ROUTINE_POSTS';

const GET_ROUTINE_POST = 'routine/GET_ROUTINE_POST';
const CREATE_ROUTINE_POST = 'routine/CREATE_ROUTINE_POST';
const UPDATE_ROUTINE_POST = 'routine/UPDATE_ROUTINE_POST';
const DELETE_ROUTINE_POST = 'routine/DELETE_ROUTINE_POST';

interface RoutineActionType {
  type: string;
}

interface RoutineStateType {
  loading: boolean;
  data: RoutinePostType[] | null;
  error: string | null;
}

export const getRoutinePosts = () => ({
  type: GET_ROUTINE_POSTS,
  routinePosts: {},
});
export const createRoutinePosts = () => ({
  type: CREATE_ROUTINE_POSTS,
  routinePosts: {},
});
export const updateRoutinePosts = () => ({
  type: UPDATE_ROUTINE_POSTS,
  routinePosts: {},
});
export const deleteRoutinePosts = () => ({
  type: DELETE_ROUTINE_POSTS,
  routinePosts: {},
});

export const getRoutinePost = () => ({
  type: GET_ROUTINE_POST,
  routinePosts: {},
});
export const createRoutinePost = () => ({
  type: CREATE_ROUTINE_POST,
  routinePosts: {},
});
export const updateRoutinePost = () => ({
  type: UPDATE_ROUTINE_POST,
  routinePosts: {},
});
export const deleteRoutinePost = () => ({
  type: DELETE_ROUTINE_POST,
  routinePosts: {},
});

const initialState: RoutineStateType = {
  loading: false,
  data: null,
  error: null,
};

const routinePosts = (
  state: RoutineStateType = initialState,
  action: RoutineActionType,
) => {
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
