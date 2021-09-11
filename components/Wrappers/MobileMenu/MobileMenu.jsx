import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

// functions and constants
import { bigHeaderMenuLinks } from '../../../inside-services/constants/constants';
import { changeMobileMenuOpened } from '../../../redux/reducers/GlobalManager/slice';

import { GrClose } from 'react-icons/gr';
import logoIMG from '../../../assets/website/mq-rect-punch-logo-black.png';

const MobileMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobilemenuOpened = useSelector((state) => state.global_manager.mobile_menu_is_opened);
  const userIsAuth = useSelector((state) => state.global_manager.user);

  const onCloseMobileMenu = () => {
    dispatch(changeMobileMenuOpened(false));
  };

  return (
    <div
      className={cn('global-mobile-menu', {
        opened: isMobilemenuOpened,
        closed: !isMobilemenuOpened,
      })}
    >
      <div className='content'>
        <div className='global-mobile-menu-header'>
          <div className='close-button' onClick={onCloseMobileMenu}>
            <GrClose />
          </div>
        </div>
        <div className='logo-area'>
          <img src={logoIMG.src} alt='logo' />
        </div>
        {!userIsAuth && <button className='start-button'>start</button>}
        <nav className='global-mobile-menu-links'>
          <ul>
            {bigHeaderMenuLinks.map((el) => (
              <Link href={el.pathname} key={el.id}>
                <li
                  onClick={onCloseMobileMenu}
                  className={cn({ active: router.pathname === el.pathname })}
                >
                  {el.label}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
