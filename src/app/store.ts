import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '@/slices/user';
import languageReducer from '@/slices/lang';

export const store = configureStore({
  reducer: {
    user: userReducer,
    lang: languageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
