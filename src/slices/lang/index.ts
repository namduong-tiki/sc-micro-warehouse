import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDefaultLocale } from '@/utils/locale';

export type Language = 'en' | 'vi';

export interface LanguageState {
  lang: Language;
}

const initialState: LanguageState = {
  lang: getDefaultLocale(),
};

const languageSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLanguage: (state: LanguageState, action: PayloadAction<string>) => {
      state.lang = action.payload as Language;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
