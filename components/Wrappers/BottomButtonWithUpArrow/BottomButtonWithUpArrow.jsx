import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { IoMdArrowUp } from 'react-icons/io';

const BottomUpButton = () => {
  const header_height = useSelector((state) => state.global_manager.header_height);
  const [buttonClassName, setButtonClassName] = useState(cn('layout-bottom-button-with-up-arrow', 'closed'));

  useEffect(() => {
    const handleResizeWindow = () =>
      setButtonClassName(
        cn('layout-bottom-button-with-up-arrow', {
          opened: window.scrollY > header_height,
          closed: window.scrollY <= header_height,
        })
      );

    window.removeEventListener('scroll', handleResizeWindow);

    window.addEventListener('scroll', handleResizeWindow);

    return () => window.removeEventListener('scroll', handleResizeWindow);
  }, [header_height]);

  return (
    <div className={buttonClassName} onClick={scrollToTop}>
      <IoMdArrowUp />
    </div>
  );

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export default BottomUpButton;
