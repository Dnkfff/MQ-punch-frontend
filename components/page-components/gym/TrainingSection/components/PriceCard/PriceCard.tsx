import React from 'react';
import { Training } from 'services/types/boxers';

interface PriceCardProps {
  pointsPerTraining: number;
  price: number;
  isMaxed: boolean;
  startTraining: () => Promise<void>;
}

const PriceCard = ({ pointsPerTraining, price, isMaxed, startTraining }: PriceCardProps) => {
  return (
    <div className={`price-container ${isMaxed ? 'disabled' : ''}`} onClick={startTraining}>
      <span className='text'>{`${pointsPerTraining.toFixed(1)} point/hour`}</span>
      <span className='text'>{`${price}$`}</span>
    </div>
  );
};

export default PriceCard;
