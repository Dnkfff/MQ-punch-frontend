import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className='progress-bar'>
      <div className='filler' style={{ width: `${progress}%` }}>
        <span className='label'>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
