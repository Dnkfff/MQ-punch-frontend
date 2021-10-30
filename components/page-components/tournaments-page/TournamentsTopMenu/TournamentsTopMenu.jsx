import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

// constants
import { tournamentsTopMenuLinks } from '../../../../inside-services/constants/constants';

const TournamentsTopMenu = () => {
  const router = useRouter();

  const currentPageLabel = tournamentsTopMenuLinks.find(
    (el) => el.pathname === router.pathname
  ).label;

  return (
    <nav className='tournaments-top-menu'>
      <div className='current-page'>
        <h2>{currentPageLabel}</h2>
      </div>
      <div className='links-row'>
        {tournamentsTopMenuLinks.map((el) => (
          <div
            className={cn('links-item', { selected: router.pathname === el.pathname })}
            onClick={() => router.push(el.pathname)}
          >
            <span>{el.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default TournamentsTopMenu;
