import React, { useState } from 'react';
import { Training } from 'services/types/boxers';
import ProgressBar from '../../../../../UI/ProgressBar/ProgressBar';

interface ActiveTrainingProps {
  trainingDuration: number;
  training: Training;
}

const ActiveTraining = ({ trainingDuration, training }: ActiveTrainingProps) => {
  // todo: normal timer
  const [progress, setProgress] = useState<number>(40);
  //const endsAt = +training.startedAt + trainingDuration
  // const now = Date.now();

  return (
    <div className='active-training'>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default ActiveTraining;
