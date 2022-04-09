import React from 'react';
import cn from 'classnames';

interface TrainingCardProps {
  title: string;
  description: string;
  imageSrc: StaticImageData;
  pointsPerTraining: number;
  price: number;
  isMaxed: boolean;
  startTraining: () => Promise<void>;
}

const TrainingCard = ({
  title,
  description,
  imageSrc,
  pointsPerTraining,
  price,
  isMaxed,
  startTraining,
}: TrainingCardProps) => {
  return (
    <div className='training-card'>
      <div className='info-container'>
        <h3 className='title'>{title}</h3>
        <h4 className='description'>{description}</h4>
      </div>
      {isMaxed && <span className='training_not_avaliable'>Training limit exceeded</span>}
      {!isMaxed && (
        <button className={'training-button'} onClick={startTraining}>
          <span className='text'>{`${pointsPerTraining.toFixed(1)} point/hour`}</span>
          <span className='text'>{price}$</span>
        </button>
      )}
      <img className='training-card__background' src={imageSrc.src} />
    </div>
  );
};

export default TrainingCard;
