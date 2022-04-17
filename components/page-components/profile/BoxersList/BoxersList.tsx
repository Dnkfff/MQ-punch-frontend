import React from 'react';
import { useTypedSelector } from '../../../../redux/store';
import Slider from 'react-slick';

// components
import Boxer from '../../../UI/boxers/ProfileBoxer/ProfileBoxer';

// interface
import { IProfileBoxer } from '../../../UI/boxers/ProfileBoxer/ProfileBoxer';
import { VisitMarket } from 'components/page-components/market-page/VisitMarket/VisitMarket';

interface IBoxersList {
  isAnother: boolean;
}

const MOBILE_SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  intialSlide: 0,
};

const BoxerListWrapper = ({ mobileVersion, isAnother, boxers }) => {
  if (mobileVersion) {
    return (
      <>
        <h4 className='boxers-list-title'>YOUR BOXERS</h4>
        <div className='slider-container'>
          <Slider {...MOBILE_SLIDER_SETTINGS}>
            {boxers.map((boxer: IProfileBoxer) => (
              <Boxer key={boxer.id} boxer={boxer} />
            ))}
          </Slider>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h4 className='boxers-list-title'>YOUR BOXERS</h4>
        <div className='row'>
          {boxers.map((boxer: IProfileBoxer) => (
            <Boxer key={boxer.id} boxer={boxer} disabledGym={!!isAnother} />
          ))}
        </div>
      </>
    );
  }
};

const BoxersList: React.FC<IBoxersList> = ({ isAnother }) => {
  const boxersLabel = isAnother ? 'another_user_boxers' : 'boxers';
  const boxers = useTypedSelector((state) => state.profile[boxersLabel]);
  const screenWidth = useTypedSelector((state) => state.global_manager.screen_width);

  return (
    <div className='boxers_list'>
      {boxers && boxers.length !== 0 && (
        <BoxerListWrapper
          mobileVersion={screenWidth && screenWidth < 600}
          isAnother={isAnother}
          boxers={boxers}
        />
      )}
      {((boxers && boxers.length === 0) || !boxers) && <VisitMarket />}
    </div>
  );
};

export default BoxersList;
