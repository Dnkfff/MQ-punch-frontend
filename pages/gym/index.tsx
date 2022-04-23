import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTypedSelector } from 'redux/store';
import Slider, { Settings } from 'react-slick';

// components
import ProfileBoxer from 'components/UI/boxers/ProfileBoxer/ProfileBoxer';
import TrainingSection from 'components/page-components/gym/TrainingSection/TrainingSection';
import { VisitMarket } from 'components/page-components/market-page/VisitMarket/VisitMarket';
import { Boxer } from 'services/types/boxers';

import { GUIDE_URL } from 'services/constants/constants';

const SLIDER_SETTINGS: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  className: 'mq-punch-slider',
};

const Gym = () => {
  const boxers = useTypedSelector((state) => state.profile.boxers) || [];
  const router = useRouter();
  let sliderRef;

  const [activeBoxer, setActiveBoxer] = useState<Boxer>(boxers[0]);

  const handleSlide = (_currentIndex: number, nextIndex: number) => {
    if (boxers[nextIndex]) setActiveBoxer(boxers[nextIndex]);
  };

  useEffect(() => {
    if (router.query && router.query.boxerId) {
      const newActiveBoxer = boxers.find((boxer) => boxer.id === router.query.boxerId) || null;
      if (newActiveBoxer) {
        setActiveBoxer(newActiveBoxer);
        sliderRef.slickGoTo(boxers.indexOf(newActiveBoxer));
      }
    }
  }, []);

  useEffect(() => {
    if (boxers && boxers.length !== 0) {
      setActiveBoxer(boxers[0]);
      sliderRef.slickGoTo(0);
    }
  }, [boxers]);

  return (
    <div className='global__gym'>
      <h1>Training center</h1>
      <h2>
        You need to train your boxer to improve some stats
        <a href={GUIDE_URL} target={'_blank'}>
          <i className='fas fa-info-circle' />
        </a>
      </h2>
      {boxers.length === 0 && <VisitMarket />}
      {boxers.length !== 0 && (
        <>
          <div className='slider-container'>
            <Slider
              ref={(slider) => (sliderRef = slider)}
              beforeChange={handleSlide}
              {...SLIDER_SETTINGS}
            >
              {boxers.map((boxer) => {
                return (
                  <div className='gym-boxer-container' key={boxer.id}>
                    <ProfileBoxer boxer={boxer} disabledGym />
                  </div>
                );
              })}
            </Slider>
          </div>
          {activeBoxer && (
            <TrainingSection boxerId={activeBoxer.id} trainingState={activeBoxer.trainingState} />
          )}
        </>
      )}
    </div>
  );
};

export default Gym;
