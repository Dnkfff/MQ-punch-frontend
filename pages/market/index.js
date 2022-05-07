import React from 'react';
import puncherBayExample from '../../assets/website/puncher_bay_example.png';

// components
import OpenSeaBanner from '../../components/page-components/market-page/OpenSeaBanner/OpenSeaBanner';
import BoxersList from '../../components/page-components/market-page/BoxersList/BoxersList';
import SocialTradeBanner from '../../components/page-components/market-page/SocialsTradeBanner/SocialTradeBanner';

const Market = () => {
  return (
    <div className='global-market-page'>
      <OpenSeaBanner />
      {/*<BoxersList />*/}
      <div className='maklet__social'>
        <div className='market__container'>
          <div className='market__social__inner'>
            <div className='market__social__title'>Join our discord for trade</div>
            <div className='market__social__btn'>
              <a href={'https://discord.com/invite/ZUZjGTp9KN'}>
                <button className='market__btn' type='button'>
                  Discord
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
