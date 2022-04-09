import React from 'react';
import TrainingAPI from '../../../../api/trainings/trainings';
import { TrainingState, TrainingTypes } from '../../../../inside-services/types/boxers';
import { TrainingCard } from './components';
import ActiveTraining from './components/ActiveTraining/ActiveTraining';

// assets
import strengthBanner from 'assets/website/gym/banners/bench_press.png';
import agilityBanner from 'assets/website/gym/banners/agility.png';
import staminaBanner from 'assets/website/gym/banners/stamina.png';

interface TrainingSectionProps {
  trainingState: TrainingState;
  boxerId: string;
  refetch: () => Promise<void>;
}

const staticTrainingPropsMap = {
  [TrainingTypes.STRENGTH]: {
    infoCardProps: {
      title: 'Bench press',
      description: 'improves your strength',
      imageSrc: strengthBanner,
    },
  },
  [TrainingTypes.STAMINA]: {
    infoCardProps: {
      title: 'Jogging',
      description: 'improves your stamina',
      imageSrc: agilityBanner,
    },
  },
  [TrainingTypes.AGILITY]: {
    infoCardProps: {
      title: 'Jump rope',
      description: 'improves your agility',
      imageSrc: staminaBanner,
    },
  },
};

const TrainingSection = ({ trainingState, boxerId, refetch }: TrainingSectionProps) => {
  const buildTrainingCardProps = (trainingType: TrainingTypes) => {
    const startTraining = async () => {
      await TrainingAPI.startTraining({ boxerId, type: trainingType, isFree: false });
      await refetch();
    };
    return {
      pointsPerTraining: trainingState.nextTrainings[trainingType].nextTrainingInfo?.boost || 0,
      price: trainingState.nextTrainings[trainingType].nextTrainingInfo?.price || 0,
      isMaxed: trainingState.nextTrainings[trainingType].isMaxed,
      startTraining,
      ...staticTrainingPropsMap[trainingType].infoCardProps,
    };
  };

  // TODO: need to discuss if we want to show some animations
  console.log({ trainingState });

  if (trainingState.isInProgress) {
    return (
      <ActiveTraining
        training={trainingState.activeTraining}
        trainingDuration={trainingState.trainingDuration}
      />
    );
  }

  return (
    <div className='trainings-wrapper'>
      <TrainingCard {...buildTrainingCardProps(TrainingTypes.STRENGTH)} />
      <TrainingCard {...buildTrainingCardProps(TrainingTypes.STAMINA)} />
      <TrainingCard {...buildTrainingCardProps(TrainingTypes.AGILITY)} />
    </div>
  );
};

export default TrainingSection;
