import React from 'react';
import { InfoCard, PriceCard } from '..';

type TrainingType = 'strength' | 'stamina' | 'agility';
interface TrainingCardProps {
  title: string;
  description: string;
  imageSrc: string;
  pointsPerTraining: number;
  price: number;
  isActionDisabled: boolean;
}

const TrainingCard = ({
  title,
  description,
  pointsPerTraining,
  price,
  isActionDisabled,
}: TrainingCardProps) => {
  const trainingPropsMap = {
    strength: {
      infoCardProps: {
        title: 'Bench press',
        description: 'improves your strength',
      },
    },
    stamina: {
      infoCardProps: {
        title: 'Jogging',
        description: 'improves your stamina',
      },
    },
    agility: {
      infoCardProps: {
        title: 'Jump rope',
        description: 'improves your agility',
      },
    },
  };

  return (
    <div className='training-card'>
      <InfoCard title={title} description={description} />
      <PriceCard
        pointsPerTraining={pointsPerTraining}
        price={price}
        isDisabled={isActionDisabled}
      />
    </div>
  );
};

export default TrainingCard;
