import React from 'react';

// assets
import usikImage from '../../../../assets/website/usik.jpg';

const BoxerPreview = (props) => {
  return (
    <div className='boxer-card'>
      <span className='title'>Your Puncher</span>

      <div className='images'>
        <img className='primary' src={usikImage.src} alt='boxer' />
        <img className='secondary' src='' alt='' />
      </div>

      <div className='divider' />

      <div className='properties'>
        <div className='item'>
          <span className='caption'>Stamina</span>
          <div className='progres-bar'>
            <div className='full-bar' />
          </div>
          <span className='count-indicator'>17/50</span>
        </div>
        <div className='item'>
          <span className='caption'>Stamina</span>
          <div className='progres-bar'>
            <div className='full-bar' />
          </div>
          <span className='count-indicator'>17/50</span>
        </div>
        <div className='item'>
          <span className='caption'>Stamina</span>
          <div className='progres-bar'>
            <div className='full-bar' />
          </div>
          <span className='count-indicator'>17/50</span>
        </div>
      </div>

      <div className='card-footer'>
        <span>Skills</span>
        <span>More</span>
        <span>3D</span>
      </div>
    </div>
  );
};

export default BoxerPreview;
