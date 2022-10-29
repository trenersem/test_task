import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { testTaskApi } from './reducers/usersApi';
import authReducer from './reducers/authSlice';

const rootReducer = combineReducers({
  authReducer,
  [testTaskApi.reducerPath]: testTaskApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testTaskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
