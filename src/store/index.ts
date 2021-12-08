import { combineReducers } from 'redux';
import user from './user';
import routine from './routines';
import routinePosts from './routinePosts';

const rootReducer = combineReducers({
  user,
  routine,
  routinePosts,
});

export default rootReducer;
