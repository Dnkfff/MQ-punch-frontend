import { useEffect } from "react";
import { useDispatch } from "react-redux";

// functions
import { onLogOut, onRefreshToken } from "../../redux/reducers/auth/slice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const handlingLogout = () => {
    window.ethereum.on("accountsChanged", (accounts) => {
      const accountNotValid = !accounts || accounts.length === 0;

      if (accountNotValid) return dispatch(onLogOut());
    });

    window.ethereum.on("disconnect", () => {
      dispatch(onLogOut());
    });
  };

  const handlingReLogin = async () => {
    const localStorageUserInfo = JSON.parse(window.localStorage.getItem("user"));

    const addressIsEqual =
      window.localStorage.user &&
      window.ethereum.selectedAddress &&
      window.ethereum.selectedAddress.toUpperCase() ===
        localStorageUserInfo.metamaskAddress.toUpperCase();

    // handle relogin with same account
    if (window.ethereum.selectedAddress && addressIsEqual) {
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

  useEffect(() => {
    if (window.ethereum) {
      handlingReLogin();
      handlingLogout();
    }
  }, []);

  return children;
};

export default AuthProvider;
