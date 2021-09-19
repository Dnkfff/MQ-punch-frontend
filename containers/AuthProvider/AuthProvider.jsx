import { useEffect } from 'react';

const AuthProvider = ({ children }) => {
  const handlingLogout = () => {
    window.ethereum.on('accountsChanged', (accounts) => {
      const accountNotValid = !accounts || accounts.length === 0;

      if (accountNotValid) return logOut();
    });
  };

  const handlingReLogin = () => {
    if (!window.localStorage.user || !window.localStorage.user.metamaskAccount) return;

    const addressIsEqual =
      window.ethereum.selectedAddress === window.localStorage.user.metamaskAccount;
    // handle relogin with same account
    if (window.ethereum.selectedAddress && addressIsEqual) {
    }

    // handle relogin with another account
    if (window.ethereum.selectedAddress && !addressIsEqual) {
    }
  };

  useEffect(() => {
    handlingReLogin();
    handlingLogout();
  }, []);

  function logOut() {}

  return children;
};

export default AuthProvider;
