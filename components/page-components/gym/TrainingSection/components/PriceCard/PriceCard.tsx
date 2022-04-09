import React from 'react';

interface PriceCardProps {
  pointsPerTraining: number;
  price: number;
  isDisabled: boolean;
}

const PriceCard = ({ pointsPerTraining, price, isDisabled }: PriceCardProps) => {
  return (
    <div className={`price-container ${isDisabled ? 'disabled' : ''}`}>
      <span className='text'>{`${pointsPerTraining.toFixed(1)} point/hour`}</span>
      <span className='text'>{`${price}$`}</span>
    </div>
  );
};

export default PriceCard;
