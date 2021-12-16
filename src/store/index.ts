import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { user } from './user';

const combinedReducer = combineReducers({
  user: user.reducer,
});

const persistConfig = {
  key: 'root',
  storage: session,
  whitelist: ['user'],
};

const rootReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: [ReduxThunk, logger],
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
