import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'redux/store';

// components
import WeightCategory from '../WeightCategory/WeightCategory';

// functions
import { setGlobalModalData } from 'redux/reducers/GlobalManager/slice';

// assets
import BoxerImg from 'assets/website/boxer/dummy-picture.svg';

// constants
import { ICONS_STORAGE_URL, GYM_ROUTE } from 'services/constants/constants';
import { WEIGHT_CATEGORY_TO_LABEL_MATCH } from 'services/constants/rating';

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

const Boxer: React.FC<{ boxer: IProfileBoxer; disabledGym?: boolean }> = (props) => {
  const { boxer, disabledGym } = props;
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.profile.user);

  const redirectToGym = (): void => {
    Router.push({
      pathname: GYM_ROUTE,
      query: { boxerId: boxer.id },
    });
  };

  const open3DPreview = (): void => {
    dispatch(
      setGlobalModalData({
        template: 'preview-3d-modal',
        onClose: () => dispatch(setGlobalModalData(null)),
      })
    );
  };

  const lossesCount =
    boxer.numberOfWins !== null && boxer.numberOfFights !== null
      ? +boxer.numberOfFights - +boxer.numberOfWins
      : 0;
  const winsCount = boxer.numberOfWins !== null ? boxer.numberOfWins : 0;
  const winratePercent =
    boxer.numberOfWins !== null && boxer.numberOfFights !== null && +boxer.numberOfFights !== 0
      ? (+boxer.numberOfWins / +boxer.numberOfFights).toFixed(0)
      : 0;

  let profileLink = `/profile/${boxer.ownerId}`;
  if (user && user.id === boxer.ownerId) {
    profileLink = '/profile';
  }

  return (
    <div className='mq-punch-boxer_profile'>
      <div className='settings'>
        {!disabledGym && (
          <button onClick={redirectToGym}>
            <i className='fas fa-dumbbell' />
          </button>
        )}
        <button onClick={open3DPreview}>3D</button>
      </div>
      <div className='boxer-preview'>
        <BoxerImg />
      </div>
      <div className='boxer-text'>
        <span className='name'>{boxer.name}</span>
        <span className='owner'>
          owned by <Link href={profileLink}>{boxer.owner.nickname}</Link>
        </span>
      </div>
      <div className='boxers-stats'>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>DIVISION</span>
          <div className='boxer-state__value-extended'>
            <span className='boxer-stat__value'>
              {boxer.boxerRating[0] ? boxer.boxerRating[0].rating : 0}
            </span>
            <img
              src={`${ICONS_STORAGE_URL}${
                boxer.boxerRating[0] ? boxer.boxerRating[0].division : 'BRONZE'
              }.svg`}
              alt=''
            />
          </div>
        </div>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>WEIGHT</span>
          <WeightCategory category={WEIGHT_CATEGORY_TO_LABEL_MATCH[boxer.weightClass]} />
        </div>
        <div className='boxer-stat'>
          <span className='boxer-stat__title'>WINRATE</span>
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
