import React, { useState } from 'react';
import BoxersAPI from '../../../../api/boxers/boxers';
import { TrainingInfo } from '../../../../inside-services/types/boxers';
import { TrainingCard } from './components';

interface TrainingSectionProps {
  trainingInfo: TrainingInfo;
}

const staticTrainingPropsMap = {
  strength: {
    infoCardProps: {
      title: 'Bench press',
      description: 'improves your strength',
      imageSrc: '',
    },
  },
  stamina: {
    infoCardProps: {
      title: 'Jogging',
      description: 'improves your stamina',
      imageSrc: '',
    },
  },
  agility: {
    infoCardProps: {
      title: 'Jump rope',
      description: 'improves your agility',
      imageSrc: '',
    },
  },
};

const TrainingSection = ({ trainingInfo }: TrainingSectionProps) => {

  const buildTrainingCardProps = (trainingType: string) => {
    return {
      pointsPerTraining: trainingInfo.nextTraining[trainingType.toUpperCase()].boost,
      price: trainingInfo.nextTraining[trainingType.toUpperCase()].trainingPrice,
      isActionDisabled: false,
      ...staticTrainingPropsMap[trainingType].infoCardProps,
    };
  }

  return (
    <div className='trainings-wrapper'>
      <TrainingCard {...buildTrainingCardProps('strength')} />
      <TrainingCard {...buildTrainingCardProps('stamina')} />
      <TrainingCard {...buildTrainingCardProps('agility')} />
    </div>
  );
};

export default TrainingSection;
