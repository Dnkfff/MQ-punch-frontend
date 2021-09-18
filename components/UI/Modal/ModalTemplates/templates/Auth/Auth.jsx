import React, { useState } from 'react';
import Web3 from 'web3';
import { service as axios } from '../../../../../../requests/axiosProvider';

// functions & constants
import { web3Provider } from '../../../../../../inside-services/constants/constants';

// assets
import metamaskIcon from '../../../../../../assets/website/icons/metamask.svg';
import { GrClose } from 'react-icons/gr';

const AuthModal = ({ data }) => {
  const { onClose } = data;

  const [warningMessage, setWarningMessage] = useState(null);

  const logIn = async () => {
    const web3 = new Web3(Web3.givenProvider || web3Provider);

    try {
      const accounts = await web3.eth.requestAccounts();

      console.log(accounts);
    } catch (error) {
      console.log(error);

      if (error.code === 4001) {
        return accountNotSelected();
      }
    }
  };

  return (
    <div className='auth-content'>
      <div className='close-button' onClick={onClose}>
        <GrClose />
      </div>
      <div className='title'>
        <h2 className='login-title'>login</h2>
        <div className='stick' />
        <h2 className='login-title'>sign-up</h2>
      </div>
      <img src={metamaskIcon.src} className='metamask-icon' />
      <button className='login-with-metamask' onClick={logIn}>
        {warningMessage ? 'Try again' : 'Continue using Metamask'}
      </button>
      {warningMessage && <span>{warningMessage}</span>}
      <span className='tooltip-learn'>learn about Metamask</span>
    </div>
  );

  function accountNotSelected() {
    setWarningMessage('User canceled the process');
  }
};

export default AuthModal;
