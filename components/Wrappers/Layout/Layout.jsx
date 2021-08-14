import React from 'react';

import BigHeader from '../BigHeader/BigHeader';
import SmallHeader from '../SmallHeader/SmallHeader';

const Layout = ({ children }) => {
  return (
    <div className='app-container'>
      <BigHeader />
      <SmallHeader />
      <div className='content'>{children}</div>
    </div>
  );
};

export default Layout;
