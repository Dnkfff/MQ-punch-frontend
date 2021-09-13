import React from 'react';

import metamaskIcon from '../../../../../../assets/website/icons/metamask.svg';
import { GrClose } from 'react-icons/gr';

const AuthModal = ({ data }) => {
  const { onLogin, onClose } = data;

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
      <button className='login-with-metamask' onClick={onLogin}>
        Continue using Metamask
      </button>
      <span className='tooltip-learn'>learn about Metamask</span>
    </div>
  );
};

export default AuthModal;
