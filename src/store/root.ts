import { combineReducers } from 'redux';
import user from './user';
import routine from './routines';
import routinePostsReducer from './routinePosts';

const rootReducer = combineReducers({
  user,
  routine,
  routinePostsReducer,
});

export default rootReducer;
