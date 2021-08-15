import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// constants
import { bigHeaderMenuLinks } from '../../../inside-services/constants/constants';

import mainBigLogoPath from '../../../assets/mq-rect-punch-logo-white.png';
import boxingRingPict from '../../../assets/boxing-ring.png';

const BigHeader = (props) => {
  const router = useRouter();

  return (
    <div className='app-container-big-header'>
      <div className='main-picture'>
        <img src={boxingRingPict.src} alt='boxing-ring' className='boxing-ring-pict' />
        <img src={mainBigLogoPath.src} alt='MQPUNCH' className='main-big-logo' />
        <div className='under-picture-info'>
          <button className='start'>Start</button>
        </div>
      </div>
      <div className='big-header-menu'>
        {bigHeaderMenuLinks.map((el) => (
          <Link
            key={el.id}
            href={{
              pathname: el.pathname,
            }}
          >
            <a className={router.pathname.includes(el.pathname) ? 'active' : 'no-active'}>{el.label}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BigHeader;
