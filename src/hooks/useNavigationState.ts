import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { openNavigation, closeNavigation, toggleNavigation } from '../store/navigationSlice';

export const useNavigationState = () => {
  const dispatch = useDispatch();
  const isNavigationOpen = useSelector((state: RootState) => state.navigation.isNavigationOpen);

  const handleOpenNavigation = () => {
    dispatch(openNavigation());
  };

  const handleCloseNavigation = () => {
    dispatch(closeNavigation());
  };

  const handleToggleNavigation = () => {
    dispatch(toggleNavigation());
  };

  return {
    isNavigationOpen,
    openNavigation: handleOpenNavigation,
    closeNavigation: handleCloseNavigation,
    toggleNavigation: handleToggleNavigation,
  };
};