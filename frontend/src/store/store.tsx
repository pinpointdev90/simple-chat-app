import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducers/userReducer';
import roomReducer from './reducers/roomReducer';

const persistConfig = {
  key: 'chat',
  storage
};

const customoziedReducer = combineReducers({
  user: userReducer,
  room: roomReducer
});
const persistedReducer = persistReducer(persistConfig, customoziedReducer);

const rootReducer = combineReducers({
  persists: persistedReducer
});

export const store = configureStore({
  reducer: rootReducer
});
