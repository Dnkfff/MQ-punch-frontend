import React from 'react';
import Link from 'next/link';

// components
import WeightCategory from '../WeightCategory/WeightCategory';

// assets
import BoxerImg from '../../../../assets/website/boxer/dummy-picture.svg';

export interface IProfileBoxer {}

const Boxer: React.FC<IProfileBoxer> = (props) => {
  return (
    <div className='mq-punch-boxer_profile'>
      <div className='boxer-preview'>
        <BoxerImg />
      </div>
      <div className='boxer-text'>
        <span className='name'>Mike Tyson</span>
        <span className='owner'>
          owned by <Link href={'/profile'}>{'17etro'}</Link>
        </span>
      </div>
      <div className='boxers-stats'>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>DIVISION</span>
          <div className='boxer-state__value-extended'>
            <span className='boxer-stat__value'>14</span>
            <img src='https://cdn-mq.fra1.digitaloceanspaces.com/site/SILVER.svg' alt='' />
          </div>
        </div>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>WEIGHT</span>
          <WeightCategory />
        </div>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>WINRATE</span>
          <span className='boxer-stat__value'>
            0% <span className='boxer-stat__value-secondary'>(0-0)</span>
          </span>
        </div>
      </div>
      <span className='stats-title'>STATS</span>
      <div className='boxers-stats'>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>STRENGTH</span>
          <span className='boxer-stat__value'>14</span>
        </div>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>AGILITY</span>
          <span className='boxer-stat__value'>14</span>
        </div>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>STAMINA</span>
          <span className='boxer-stat__value'>14</span>
        </div>
      </div>
    </div>
  );
};

export default Boxer;
