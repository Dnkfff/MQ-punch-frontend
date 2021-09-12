import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import cn from 'classnames';
import Link from 'next/link';

import Modal from '../../UI/Modal/Modal';
import BigHeaderMenuLinks from '../BigHeaderMenuLinks/BigHeaderMenuLinks';

import { getUUID } from '../../../inside-services/get-uuid/get-uuid';
import {
  changeHeaderHeight,
  onLogIn,
  changeMobileMenuOpened,
} from '../../../redux/reducers/GlobalManager/slice';

import mainBigLogoPath from '../../../assets/website/mq-rect-punch-logo-white.png';
import boxingRingPict from '../../../assets/website/boxing-ring.png';
import creditCardSVG from '../../../assets/website/icons/credit_card.svg';
import profileIconSVG from '../../../assets/website/icons/profile_icon.svg';
import { HiMenuAlt2 } from 'react-icons/hi';

const BigHeader = (props) => {
  const { header_height } = props;
  const dispatch = useDispatch();
  const userIsAuth = useSelector((state) => state.global_manager.user);
  const headerRef = useRef(getUUID());

  const [modalData, setModalData] = useState(null);

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

  return (
    <>
      <Modal data={modalData} />
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
              <div className='balance'>
                <img src={creditCardSVG.src} alt='credit_card' />
                <span>{'300.00 $'}</span>
              </div>
              <Link href={'/profile'}>
                <div className='profile'>
                  <img src={profileIconSVG.src} alt='profile' />
                </div>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );

  function onOpenAuthModal() {
    setModalData({
      template: 'auth-modal',
      onClose: () => setModalData(null),
      onLogin: () => {
        setModalData(null);
        dispatch(onLogIn());
      },
    });
  }
};

const mapStateToProps = (state) => ({
  header_height: state.global_manager.header_height,
});

export default connect(mapStateToProps)(BigHeader);
