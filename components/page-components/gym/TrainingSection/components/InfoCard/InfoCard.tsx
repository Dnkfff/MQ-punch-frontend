import React from 'react';
interface InfoCardProps {
  title: string;
  description: string;
}

const PriceCard = ({ title, description }: InfoCardProps) => {
  return (
    <div className='info-container'>
      <span className='title'>{title}</span>
      <span className='description'>{description}</span>
    </div>
  );
};

export default PriceCard;
