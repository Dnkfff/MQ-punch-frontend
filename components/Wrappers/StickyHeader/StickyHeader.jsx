import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

// components
import BigHeaderMenuLinks from '../BigHeaderMenuLinks/BigHeaderMenuLinks';

// functions
import {
  changeMobileMenuOpened,
  setGlobalModalData,
} from '../../../redux/reducers/GlobalManager/slice';
import { getUUID } from '../../../inside-services/get-uuid/get-uuid';

// assets
import logotype from '../../../assets/website/logos/mq-punch-logo-small.png';
import CreditCardSVG from '../../../assets/website/icons/credit_card.svg';
import ProfileIconSVG from '../../../assets/website/icons/profile_icon.svg';
import { HiMenuAlt2 } from 'react-icons/hi';

const StickyHeader = (props) => {
  const dispatch = useDispatch();
  const { showStickyHeader } = props;
  const profileDropDownRef = useRef(getUUID());

  const [profileDropDownOpen, setProfileDropDownOpen] = useState(false);

  const userIsAuth = !!useSelector((state) => state.auth.user);
  const smallHeaderClassName = `app-container-sticky-header ${
    showStickyHeader ? 'opened' : 'closed'
  }`;

  const onOpenMobileMenu = () => {
    dispatch(changeMobileMenuOpened(true));
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
    <div className={smallHeaderClassName}>
      <div className='left'>
        <Link href='/'>
          <div className='logotype'>
            <img src={logotype.src} alt='MQPUNCH' />
          </div>
        </Link>

        <div className='menu-icon' onClick={onOpenMobileMenu}>
          <HiMenuAlt2 />
        </div>

        <nav className='sticky-header-links'>
          <BigHeaderMenuLinks />
        </nav>
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
  );

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

export default StickyHeader;
