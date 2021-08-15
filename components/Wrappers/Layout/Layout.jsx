import React, { useState, useEffect } from 'react';

import BigHeader from '../BigHeader/BigHeader';
import SmallHeader from '../SmallHeader/SmallHeader';

// constants
import { scrollStickyHeaderLength } from '../../../inside-services/constants/constants';

const Layout = ({ children }) => {
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    const handleResizeWindow = () => setShowStickyHeader(window.scrollY > scrollStickyHeaderLength);

    window.addEventListener('scroll', handleResizeWindow);

    return () => window.removeEventListener('scroll', handleResizeWindow);
  }, []);

  return (
    <div className='app-container'>
      <BigHeader />
      <SmallHeader showStickyHeader={showStickyHeader} />
      <div className='content'>{children}</div>
    </div>
  );
};

export default Layout;
