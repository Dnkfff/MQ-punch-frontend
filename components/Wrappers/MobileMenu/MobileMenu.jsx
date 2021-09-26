import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

// components
import Modal from '../../UI/Modal/Modal';

// functions and constants
import { bigHeaderMenuLinks } from '../../../inside-services/constants/constants';
import { changeMobileMenuOpened } from '../../../redux/reducers/globalManager/slice';

import creditCardSVG from '../../../assets/website/icons/credit_card_black.svg';
import profileIconSVG from '../../../assets/website/icons/profile_icon_black.svg';
import { GrClose } from 'react-icons/gr';
import logoIMG from '../../../assets/website/mq-rect-punch-logo-black.png';

const MobileMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobilemenuOpened = useSelector((state) => state.global_manager.mobile_menu_is_opened);
  const userIsAuth = !!useSelector((state) => state.auth.user);

  const [modalData, setModalData] = useState(null);

  const onCloseMobileMenu = () => {
    dispatch(changeMobileMenuOpened(false));
  };

  return (
    <>
      <Modal data={modalData} />
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
                <div className='profile'>
                  <img src={profileIconSVG.src} alt='profile' />
                </div>
                <div className='balance'>
                  <span>{'300.00 $'}</span>
                  <img src={creditCardSVG.src} alt='credit_card' />
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
    </>
  );

  function onOpenAuthModal() {
    onCloseMobileMenu();

    setModalData({
      template: 'auth-modal',
      onClose: () => setModalData(null),
    });
  }
};

export default MobileMenu;
