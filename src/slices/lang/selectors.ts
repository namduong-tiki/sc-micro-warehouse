import { RootState } from '@/app/store';

export const selectLanguage = (state: RootState) => state.lang.lang;
