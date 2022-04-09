import React from 'react';
import Slider, { Settings } from 'react-slick';

interface SliderComponentProps {
  children: React.ReactChild[];
  slidesToShow?: number;
  onChange?: (currentIndex: number, nextIndex: number) => void;
}

const SliderComponent = ({ children, onChange, slidesToShow = 1 }: SliderComponentProps) => {
  const sliderProps = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    className: 'mq-punch-slider',
  };

  return (
    <Slider beforeChange={onChange} {...sliderProps}>
      {children}
    </Slider>
  );
};

export default SliderComponent;
