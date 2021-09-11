import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

// components
import BigHeaderMenuLinks from '../BigHeaderMenuLinks/BigHeaderMenuLinks';

// functions
import { changeMobileMenuOpened } from '../../../redux/reducers/GlobalManager/slice';

// assets
import logotype from '../../../assets/website/mq-punch-logo-small.png';
import creditCardSVG from '../../../assets/website/icons/credit_card.svg';
import profileIconSVG from '../../../assets/website/icons/profile_icon.svg';
import { HiMenuAlt2 } from 'react-icons/hi';

const StickyHeader = (props) => {
  const dispatch = useDispatch();
  const { showStickyHeader } = props;

  const userIsAuth = useSelector((state) => state.global_manager.user);
  const smallHeaderClassName = `app-container-sticky-header ${
    showStickyHeader ? 'opened' : 'closed'
  }`;

  const onOpenMobileMenu = () => {
    dispatch(changeMobileMenuOpened(true));
  };

  return (
    <div className={smallHeaderClassName}>
      <div className='left'>
        <div className='logotype'>
          <img src={logotype.src} alt='MQPUNCH' />
        </div>

        <div className='menu-icon' onClick={onOpenMobileMenu}>
          <HiMenuAlt2 />
        </div>

        <nav className='sticky-header-links'>
          <BigHeaderMenuLinks />
        </nav>
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
  );
};

export default StickyHeader;
