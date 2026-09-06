import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { openNavigation, closeNavigation, toggleNavigation } from '../store/navigationSlice';

export const useNavigationState = () => {
  const dispatch = useDispatch();
  const isNavigationOpen = useSelector((state: RootState) => state.navigation.isNavigationOpen);

  const handleOpenNavigation = useCallback(() => {
    dispatch(openNavigation());
  }, [dispatch]);

  const handleCloseNavigation = useCallback(() => {
    dispatch(closeNavigation());
  }, [dispatch]);

  const handleToggleNavigation = useCallback(() => {
    dispatch(toggleNavigation());
  }, [dispatch]);

  return {
    isNavigationOpen,
    openNavigation: handleOpenNavigation,
    closeNavigation: handleCloseNavigation,
    toggleNavigation: handleToggleNavigation,
  };
};
