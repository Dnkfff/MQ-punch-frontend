import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// functions
import { onLogOut, onRefreshToken, resetUser } from '../../redux/reducers/auth/slice';
import { resetUserProfile } from '../../redux/reducers/profile/slice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const handlingLogout = () => {
    window.ethereum.on('accountsChanged', (accounts) => {
      const accountNotValid = !accounts || accounts.length === 0;

      if (accountNotValid) return dispatch(onLogOut());
    });

    window.ethereum.on('disconnect', () => {
      dispatch(onLogOut());
    });
  };

  const handlingReLogin = async () => {
    const userInfo = window.localStorage.getItem('user');
    if (!userInfo) return;

    const localStorageUserInfo = JSON.parse(window.localStorage.getItem('user'));

    const addressIsEqual =
      window.localStorage.user &&
      window.ethereum.selectedAddress &&
      window.ethereum.selectedAddress.toUpperCase() ===
        localStorageUserInfo.metamaskAddress.toUpperCase();

    // handle relogin with same account
    if (window.ethereum.selectedAddress && addressIsEqual) {
      dispatch(resetUser(localStorageUserInfo));
      return dispatch(
        onRefreshToken({
          refreshToken: localStorageUserInfo.refreshToken,
        })
      );
    }

    // handle relogin with another account
    if (window.ethereum.selectedAddress && !addressIsEqual) {
      return dispatch(onLogOut());
    }
  };

  const tryResetUserProfile = () => {
    const profileExist = window.localStorage.getItem('profile');
    if (!profileExist) return;

    const previousProfileInfo = JSON.parse(window.localStorage.getItem('profile'));
    dispatch(resetUserProfile(previousProfileInfo));
  };

  useEffect(() => {
    if (window.ethereum) {
      handlingReLogin();
      tryResetUserProfile();
      handlingLogout();
    }
  }, []);

  return children;
};

export default AuthProvider;
