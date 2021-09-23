import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';

// functions & constants
import { onLogIn } from '../../redux/reducers/auth/slice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const handlingLogout = () => {
    window.ethereum.on('accountsChanged', (accounts) => {
      const accountNotValid = !accounts || accounts.length === 0;

      if (accountNotValid) return logOut();
    });
  };

  const handlingReLogin = async () => {
    const addressIsEqual =
      window.localStorage.user &&
      window.ethereum.selectedAddress ===
        JSON.parse(window.localStorage.getItem('user')).metamaskAddress;

    // handle relogin with same account
    if (window.ethereum.selectedAddress && !addressIsEqual) {
    }

    // handle relogin with another account
    if (window.ethereum.selectedAddress && !addressIsEqual) {
      const web3 = new Web3(Web3.givenProvider);

      const accounts = await web3.eth.requestAccounts();

      const signature = await web3.eth.personal.sign('MQ PUNCH', accounts[0], '');

      return dispatch(
        onLogIn({
          signature,
          metamaskAddress: window.ethereum.selectedAddress,
        })
      );
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
