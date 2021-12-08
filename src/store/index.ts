import { combineReducers } from 'redux';
import userReducer from './user';
import routineReducer from './routines';
import routinePostsReducer from './routinePosts';

const rootReducer = combineReducers({
  userReducer,
  routineReducer,
  routinePostsReducer,
});

export default rootReducer;
