import React from 'react';

const AuthModal = ({ data }) => {
  const { onLogin } = data;

  return (
    <div>
      <button onClick={onLogin}>LOGIN</button>
    </div>
  );
};

export default AuthModal;
