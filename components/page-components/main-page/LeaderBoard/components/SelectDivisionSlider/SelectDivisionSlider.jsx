import React, { useState } from 'react';
import Slider from 'react-slick';
import cn from 'classnames';

// functions & constants
import { slides } from './constants';

// css for slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DivisionItem = ({ item, activeSlide }) => {
  return (
    <div className={cn('division-item', item.type, { active: activeSlide.type === item.type })}>
      {item.icon && <img src={item.icon.src} />}
      {!item.icon && (
        <>
          <p>TOP</p>
          <p>1000</p>
        </>
      )}
    </div>
  );
};

const PrevArrow = ({ onClick }) => (
  <div className='division-slider-prev-arrow' onClick={onClick}>
    <i className='fas fa-chevron-left'></i>
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className='division-slider-next-arrow' onClick={onClick}>
    <i className='fas fa-chevron-right'></i>
  </div>
);

const SelectDivisionSlider = () => {
  const [activeSlide, setActiveSlide] = useState(slides[0]);
  const settings = {
    infinite: true,
    dots: true,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '30px',
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setActiveSlide(slides[next]),
  };

  return (
    <div className='select-division-slider'>
      <Slider {...settings}>
        {slides.map((el) => (
          <DivisionItem key={el.id} item={el} activeSlide={activeSlide} />
        ))}
      </Slider>
    </div>
  );
};

export default SelectDivisionSlider;
