import React from 'react';

interface TrainingCardProps {
  title: string;
  description: string;
  imageSrc: string;
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
        <span className='title'>{title}</span>
        <span className='description'>{description}</span>
      </div>
      <div className={`price-container ${isMaxed ? 'disabled' : ''}`} onClick={startTraining}>
        {isMaxed ? (
          <span className='text'>{`Training limit exceeded`}</span>
        ) : (
          <>
            <span className='text'>{`${pointsPerTraining.toFixed(1)} point/hour`}</span>
            <span className='text'>{`${price}$`}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default TrainingCard;
