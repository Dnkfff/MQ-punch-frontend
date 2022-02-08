import React from 'react';

const OpenSeaBanner = () => {
  return (
    <div className='opensea-banner'>
      <h2>To start playing you must have at list one boxer.</h2>
      <a href='https://opensea.io/' target='_blank' className='banner'>
        <div className='banner-div'>

          <span>BUY BOXERS ON OPENSEA</span>

        </div>
      </a>
    </div>
  );
};

export default OpenSeaBanner;
