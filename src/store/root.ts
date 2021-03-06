import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';
import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { user } from './user';
import { routine } from './routine';

const persistConfig = {
  key: 'root',
  storage: session,
  whitelist: ['user', 'routine'],
};

const combinedReducer = combineReducers({
  user: user.reducer,
  routine: routine.reducer,
});

const rootReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: [ReduxThunk],
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
