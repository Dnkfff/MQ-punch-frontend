import React from 'react';
import Link from 'next/link';

// components
import WeightCategory from '../WeightCategory/WeightCategory';

// assets
import BoxerImg from '../../../../assets/website/boxer/dummy-picture.svg';

// constants
import { ICONS_STORAGE_URL } from '../../../../inside-services/constants/constants';
import { WEIGHT_CATEGORY_TO_LABEL_MATCH } from '../../../../inside-services/constants/rating';

export interface IStats {
  agility: string | number;
  strength: string | number;
  stamina: string | number;
}

export interface IBoxerRating {
  division: string;
  rating: string | number;
}

export interface IOwner {
  id: string;
  nickname: string;
}

export interface IProfileBoxer {
  boxerRating: IBoxerRating[];
  id: string;
  logo: string;
  mainStat: string;
  modelLink: string;
  name: string;
  numberOfFights: number;
  numberOfWins: number;
  owner: IOwner;
  ownerId: string;
  stats: IStats;
  statsId: string;
  weightClass: string;
}

const Boxer: React.FC<{ boxer: IProfileBoxer }> = ({ boxer }) => {
  const lossesCount =
    boxer.numberOfWins !== null && boxer.numberOfFights !== null
      ? +boxer.numberOfFights - +boxer.numberOfWins
      : 0;
  const winsCount = boxer.numberOfWins !== null ? boxer.numberOfWins : 0;
  const winratePercent =
    boxer.numberOfWins !== null && boxer.numberOfFights !== null && +boxer.numberOfFights !== 0
      ? (+boxer.numberOfWins / +boxer.numberOfFights).toFixed(0)
      : 0;

  return (
    <div className='mq-punch-boxer_profile'>
      <div className='settings'>
        <button>
          <i className='fas fa-dumbbell' />
        </button>
        <button>3D</button>
      </div>
      <div className='boxer-preview'>
        <BoxerImg />
      </div>
      <div className='boxer-text'>
        <span className='name'>{boxer.name}</span>
        <span className='owner'>
          owned by <Link href={'/profile'}>{boxer.owner.nickname}</Link>
        </span>
      </div>
      <div className='boxers-stats'>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>DIVISION</span>
          <div className='boxer-state__value-extended'>
            <span className='boxer-stat__value'>{boxer.boxerRating[0].rating}</span>
            <img src={`${ICONS_STORAGE_URL}${boxer.boxerRating[0].division}.svg`} alt='' />
          </div>
        </div>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>WEIGHT</span>
          <WeightCategory category={WEIGHT_CATEGORY_TO_LABEL_MATCH[boxer.weightClass]} />
        </div>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>boxer</span>
          <span className='boxer-stat__value'>
            {winratePercent}%{' '}
            <span className='boxer-stat__value-secondary'>
              ({winsCount}-{lossesCount})
            </span>
          </span>
        </div>
      </div>
      <span className='stats-title'>STATS</span>
      <div className='boxers-stats'>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>STRENGTH</span>
          <span className='boxer-stat__value'>{boxer.stats.strength}</span>
        </div>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>AGILITY</span>
          <span className='boxer-stat__value'>{boxer.stats.agility}</span>
        </div>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>STAMINA</span>
          <span className='boxer-stat__value'>{boxer.stats.stamina}</span>
        </div>
      </div>
    </div>
  );
};

export default Boxer;