import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cn from 'classnames';
import Link from 'next/link';

import BigHeaderMenuLinks from '../BigHeaderMenuLinks/BigHeaderMenuLinks';

import { getUUID } from '../../../inside-services/get-uuid/get-uuid';
import {
  changeHeaderHeight,
  changeMobileMenuOpened,
  setGlobalModalData,
} from '../../../redux/reducers/GlobalManager/slice';
import { onLogOut } from '../../../redux/reducers/auth/slice';

import mainBigLogoPath from '../../../assets/website/logos/mq-rect-punch-logo-white.png';
import boxingRingPict from '../../../assets/website/boxing-ring.png';
import CreditCardSVG from '../../../assets/website/icons/credit_card.svg';
import ProfileIconSVG from '../../../assets/website/icons/profile_icon.svg';
import { HiMenuAlt2 } from 'react-icons/hi';

const BigHeader = (props) => {
  const { header_height } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const userIsAuth = !!useSelector((state) => state.auth.user);
  const headerRef = useRef(getUUID());
  const profileDropDownRef = useRef(getUUID());

  const [profileDropDownOpen, setProfileDropDownOpen] = useState(false);

  const onOpenMobileMenu = () => {
    dispatch(changeMobileMenuOpened(true));
  };

  useEffect(() => {
    if (header_height === 0) {
      dispatch(changeHeaderHeight(headerRef.current.clientHeight));
    }

    window.onresize = () => {
      if (headerRef.current.clientHeight !== header_height) {
        dispatch(changeHeaderHeight(headerRef.current.clientHeight));
      }
    };
  }, []);

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
    <header className='app-container-big-header' ref={headerRef}>
      <div className='main-picture'>
        <img src={boxingRingPict.src} alt='boxing-ring' className='boxing-ring-pict' />
        <Link href={'/'}>
          <img src={mainBigLogoPath.src} alt='MQPUNCH' className='main-big-logo' />
        </Link>
        {!userIsAuth && (
          <div className='under-picture-info'>
            <button className='start' onClick={onOpenAuthModal}>
              Start
            </button>
          </div>
        )}
      </div>
      <div
        className={cn('big-header-menu', {
          'only-menu': !userIsAuth,
          'menu-with-icons': userIsAuth,
        })}
      >
        <nav className='links'>
          <BigHeaderMenuLinks />
        </nav>
        <div className='menu-icon' onClick={onOpenMobileMenu}>
          <HiMenuAlt2 />
        </div>
        {userIsAuth && (
          <div className='right'>
            <div className='balance' onClick={onOpenBalanceModal}>
              <span>{'0.0000 ETH'}</span>
              <CreditCardSVG className='wallet-icon' />
              <i className='fas fa-caret-down'></i>
            </div>
            <div className='profile' onClick={() => setProfileDropDownOpen((v) => !v)}>
              <ProfileIconSVG />
              <ul
                className={cn('profile-dropdown', {
                  opened: profileDropDownOpen,
                  closed: !profileDropDownOpen,
                })}
                ref={profileDropDownRef}
              >
                <li onClick={() => router.push('/profile')}>
                  <div className='icon'>
                    <i className='fas fa-user' />
                  </div>
                  <span>Profile</span>
                </li>
                <li onClick={() => router.push('/settings')}>
                  <div className='icon'>
                    <i className='fas fa-cog' />
                  </div>
                  <span>Settings</span>
                </li>
                <li
                  onClick={() => {
                    router.push('/');
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
          </div>
        )}
      </div>
    </header>
  );

  function onOpenAuthModal() {
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

const mapStateToProps = (state) => ({
  header_height: state.global_manager.header_height,
});

export default connect(mapStateToProps)(BigHeader);
