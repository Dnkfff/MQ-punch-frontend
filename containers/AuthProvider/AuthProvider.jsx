import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// constants
import { userProfileExpirationTime } from '../../inside-services/constants/constants';

// functions
import { onLogOut, onRefreshToken, onResetUserInfo } from '../../redux/reducers/auth/slice';
import {
  resetProfileUser,
  getUserProfile,
  getUserBoxers,
} from '../../redux/reducers/profile/slice';

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
      localStorageUserInfo &&
      localStorageUserInfo.metamaskAddress &&
      window.ethereum &&
      window.ethereum.selectedAddress &&
      window.ethereum.selectedAddress.toUpperCase() ===
        localStorageUserInfo.metamaskAddress.toUpperCase();

    // handle relogin with same account
    if (window.ethereum.selectedAddress && addressIsEqual) {
      dispatch(onResetUserInfo());
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
    const userExist = window.localStorage.getItem('profile_user');
    const timeExpires =
      window.localStorage.getItem('last_user_update') &&
      Math.abs(+window.localStorage.getItem('last_user_update') - Date.now()) >=
        userProfileExpirationTime;

    if (!userExist) {
      dispatch(onLogOut());
    }
    if (timeExpires) {
      dispatch(getUserProfile());
      dispatch(getUserBoxers());
    }

    const previousProfileInfo = JSON.parse(window.localStorage.getItem('profile_user'));
    dispatch(resetProfileUser(previousProfileInfo));
  };

  useEffect(() => {
    (async function () {
      if (window.ethereum) {
        await handlingReLogin();
        tryResetUserProfile();
        handlingLogout();
      }
    })();
  }, []);

  return children;
};

export default AuthProvider;
