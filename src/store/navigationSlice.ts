import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  isNavigationOpen: boolean;
}

const initialState: NavigationState = {
  isNavigationOpen: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    openNavigation: (state) => {
      state.isNavigationOpen = true;
    },
    closeNavigation: (state) => {
      state.isNavigationOpen = false;
    },
    toggleNavigation: (state) => {
      state.isNavigationOpen = !state.isNavigationOpen;
    },
  },
});

export const { openNavigation, closeNavigation, toggleNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;