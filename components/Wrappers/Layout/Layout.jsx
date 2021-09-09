import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import BigHeader from '../BigHeader/BigHeader';
import StickyHeader from '../StickyHeader/StickyHeader';
import MobileMenu from '../MobileMenu/MobileMenu';
import BottomButtonWithUpArrow from '../BottomButtonWithUpArrow/BottomButtonWithUpArrow';

const Layout = ({ children }) => {
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const header_height = useSelector((state) => state.global_manager.header_height);

  useEffect(() => {
    const handleResizeWindow = () => setShowStickyHeader(window.scrollY > header_height);

    window.addEventListener('scroll', handleResizeWindow);

    return () => window.removeEventListener('scroll', handleResizeWindow);
  }, [header_height]);

  return (
    <div className='app-container'>
      <BigHeader />
      <MobileMenu />
      <StickyHeader showStickyHeader={showStickyHeader} />
      <div className='content'>{children}</div>
      <BottomButtonWithUpArrow />
    </div>
  );
};

export default Layout;
