import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

// functions and constants
import { bigHeaderMenuLinks } from 'services/constants/constants';
import {
  changeMobileMenuOpened,
  setGlobalModalData,
} from '../../../redux/reducers/GlobalManager/slice';
import { onLogOut } from '../../../redux/reducers/auth/slice';
import { getUUID } from 'services/get-uuid/get-uuid';

import CreditCardSVG from '../../../assets/website/icons/credit_card_black.svg';
import ProfileIconSVG from '../../../assets/website/icons/profile_icon_black.svg';
import { GrClose } from 'react-icons/gr';
import logoIMG from '../../../assets/website/logos/mq-rect-punch-logo-black.png';

const MobileMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobilemenuOpened = useSelector((state) => state.global_manager.mobile_menu_is_opened);
  const userIsAuth = !!useSelector((state) => state.auth.user);
  const profileDropDownRef = useRef(getUUID());

  const [profileDropDownOpen, setProfileDropDownOpen] = useState(false);

  const onCloseMobileMenu = () => {
    dispatch(changeMobileMenuOpened(false));
  };

  useEffect(() => {
    if (profileDropDownOpen) {
      document.addEventListener('mousedown', handleClickOutsideProfileDD);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideProfileDD);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideProfileDD);
    };
  }, [profileDropDownOpen]);

  return (
    <div
      className={cn('global-mobile-menu', {
        opened: isMobilemenuOpened,
        closed: !isMobilemenuOpened,
      })}
    >
      <div className='content'>
        <div className={cn('global-mobile-menu-header', { multiplied: userIsAuth })}>
          {userIsAuth && (
            <div className='user-info'>
              <div className='profile' onClick={() => setProfileDropDownOpen((v) => !v)}>
                <ProfileIconSVG />
                <ul
                  className={cn('profile-dropdown', {
                    opened: profileDropDownOpen,
                    closed: !profileDropDownOpen,
                  })}
                  ref={profileDropDownRef}
                >
                  <li
                    onClick={() => {
                      onCloseMobileMenu();
                      router.push('/profile');
                    }}
                  >
                    <div className='icon'>
                      <i className='fas fa-user' />
                    </div>
                    <span>Profile</span>
                  </li>
                  <li
                    onClick={() => {
                      onCloseMobileMenu();
                      router.push('/settings');
                    }}
                  >
                    <div className='icon'>
                      <i className='fas fa-cog' />
                    </div>
                    <span>Settings</span>
                  </li>
                  <li
                    onClick={() => {
                      onCloseMobileMenu();
                      dispatch(onLogOut());
                    }}
                  >
                    <div className='icon'>
                      <i className='fas fa-sign-out' />
                    </div>
                    <span>Log Out</span>
                  </li>
                </ul>
              </div>
              <div className='balance' onClick={onOpenBalanceModal}>
                <span>{'0.0000 ETH'}</span>
                <CreditCardSVG className='wallet-icon' />
                <i className='fas fa-caret-down'></i>
              </div>
            </div>
          )}
          <div className='close-button' onClick={onCloseMobileMenu}>
            <GrClose />
          </div>
        </div>
        <Link href={'/'}>
          <div className='logo-area' onClick={onCloseMobileMenu}>
            <img src={logoIMG.src} alt='logo' />
          </div>
        </Link>
        {!userIsAuth && (
          <button className='start-button' onClick={onOpenAuthModal}>
            start
          </button>
        )}
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

  function onOpenAuthModal() {
    onCloseMobileMenu();

    dispatch(
      setGlobalModalData({
        template: 'auth-modal',
        onClose: () => dispatch(setGlobalModalData(null)),
      })
    );
  }

  function onOpenBalanceModal() {
    dispatch(
      setGlobalModalData({
        template: 'balance-modal',
        onClose: () => dispatch(setGlobalModalData(null)),
      })
    );
  }

  function handleClickOutsideProfileDD(event) {
    if (profileDropDownRef.current.contains(event.target)) {
      return;
    } else {
      setProfileDropDownOpen(false);
    }
  }
};

export default MobileMenu;
