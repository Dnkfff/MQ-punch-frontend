import React from 'react';
import Link from 'next/link';

import BigHeaderMenuLinks from '../BigHeaderMenuLinks/BigHeaderMenuLinks';

// assets
import logotype from '../../../assets/website/mq-punch-logo-small.png';
import creditCardSVG from '../../../assets/website/icons/credit_card.svg';
import profileIconSVG from '../../../assets/website/icons/profile_icon.svg';
import { HiMenuAlt2 } from 'react-icons/hi';

const StickyHeader = (props) => {
  const { showStickyHeader } = props;

  const smallHeaderClassName = `app-container-sticky-header ${showStickyHeader ? 'opened' : 'closed'}`;

  return (
    <div className={smallHeaderClassName}>
      <div className='left'>
        <div className='logotype'>
          <img src={logotype.src} alt='MQPUNCH' />
        </div>

        <div className='menu-icon'>
          <HiMenuAlt2 />
        </div>

        <nav className='sticky-header-links'>
          <BigHeaderMenuLinks />
        </nav>
      </div>
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
    </div>
  );
};

export default StickyHeader;
