import React from 'react';

import boxerPunchBag from '../../../../assets/website/boxer_punch_bag.png';

const WelcomeBlock = () => {
  return (
    <div className='welcome-block'>
      <p className='welcome-slogan'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p className='welcome-slogan'>
        Et consectetur dolore explicabo fugiat nulla veniam unde autem.
      </p>
      <button className='welcome-start-button'>
        <img src={boxerPunchBag.src} className='bg-image' alt='' />
        <span>start</span>
      </button>
    </div>
  );
};

export default WelcomeBlock;
