import React from 'react';

// assets
import BoxerImage from '../../../../assets/website/tyson.svg';
import { Boxer } from '../../../../inside-services/types/boxers';
import ThreeDIcon from '../../../../assets/website/icons/3d.svg';

interface BoxerPreviewProps {
  boxer?: Boxer;
}

const BoxerPreview = ({ boxer }: BoxerPreviewProps) => {
  return (
    <div className='boxer-card'>
      <div className='logo'>{boxer.logo ? <img src={boxer.logo} /> : <BoxerImage />}</div>
      <div className='title-section'>
        <span className='boxer-name'>{boxer.name}</span>
        <div className='boxer-owner'>
          <span>OWNED BY</span>
          <a href='/'> VSEM_Q</a>
        </div>
        <ThreeDIcon />
      </div>

      <div className='divider' />

      <div className='properties-wrapper'>
        <div className='property'>
          <span className='header'>DIVISION</span>
        </div>
        <div className='property'>
          <span className='header'>WEIGHT</span>
        </div>
        <div className='property'>
          <span className='header'>WINRATE</span>
        </div>
        <div className='property'>
          <span className='primary-info'>4900</span>
        </div>
        <div className='property'>
          <span className='weight-class'>{boxer.weightClass}</span>
        </div>
        <div className='property'>
          <span className='primary-info'>42%</span>
          <span className='secondary-info'>(3-2)</span>
        </div>
        <div className='property full-row'>
          <span className='text-divider'>STATS</span>
        </div>
        <div className='property'>
          <span className='header'>STRENGTH</span>
        </div>
        <div className='property'>
          <span className='header'>AGILITY</span>
        </div>
        <div className='property'>
          <span className='header'>STAMINA</span>
        </div>
        <div className='property'>
          <span className='primary-info'>{boxer.stats.strength}</span>
        </div>
        <div className='property'>
          <span className='primary-info'>{boxer.stats.agility}</span>
        </div>
        <div className='property'>
          <span className='primary-info'>{boxer.stats.stamina}</span>
        </div>
      </div>
    </div>
  );
};

export default BoxerPreview;
