import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import cn from 'classnames';

// components
import FilteringSection from '../FilteringSection/FilteringSection';

// constants
import { tournamentsTopMenuLinks } from '../../../../inside-services/constants/constants';

// functions
import { changeFilterMenuOpenedState } from '../../../../redux/reducers/tournaments/slice';

const TournamentsTopMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const filterSectionOpened = useSelector((state) => state.tournaments.filter_menu_is_open);

  const currentPage = tournamentsTopMenuLinks.find((el) => el.pathname === router.pathname);

  useEffect(() => {
    if (!currentPage.filtering) {
      return dispatch(changeFilterMenuOpenedState(false));
    }
  }, [currentPage]);

  return (
    <>
      <nav className='tournaments-top-menu'>
        <div className='current-page'>
          <h2>{currentPage.label}</h2>
          {currentPage.filtering && (
            <button
              className={cn('filtering', { active: filterSectionOpened })}
              onClick={() => dispatch(changeFilterMenuOpenedState(!filterSectionOpened))}
            >
              <i className='far fa-filter' />
              <span>Filters</span>
            </button>
          )}
        </div>
        <div className='links-row'>
          {tournamentsTopMenuLinks.map((el) => (
            <div
              className={cn('links-item', { selected: router.pathname === el.pathname })}
              onClick={() => router.push(el.pathname)}
              key={el.id}
            >
              <span>{el.label}</span>
            </div>
          ))}
        </div>
      </nav>
      {filterSectionOpened && <FilteringSection currentPage={currentPage} />}
    </>
  );
};

export default TournamentsTopMenu;
