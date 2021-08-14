import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// constants
import { bigHeaderMenuLinks } from '../../../inside-services/constants/constants';

const mainBigLogoPath = '/assets/html/main-big-logo.svg';

const BigHeader = (props) => {
  const router = useRouter();

  return (
    <div className='app-container-big-header'>
      <div className='main-picture'>
        <img src={mainBigLogoPath} alt='logotype' className='main-big-logo' />
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
