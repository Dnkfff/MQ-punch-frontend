import React from 'react';

// assets
import ChartDiagramIcon from '../../../../assets/website/profile/chart-diagram.svg';
import ChartIcon from '../../../../assets/website/profile/chart.svg';
import TrophiesIcon from '../../../../assets/website/profile/trophies.svg';

const Statistic: React.FC = () => {
  return (
    <div className='boxers_info_total_bar'>
      <div className='statistic-item'>
        <div className='statistic-icon'>
          <ChartDiagramIcon />
        </div>
        <span className='statistic-text'>42% (3-2)</span>
      </div>
      <div className='statistic-item'>
        <div className='statistic-icon'>
          <TrophiesIcon />
        </div>
        <span className='statistic-text'>4900</span>
      </div>
      <div className='statistic-item'>
        <div className='statistic-icon'>
          <ChartIcon />
        </div>
        <span className='statistic-text'>12 ETH</span>
      </div>
    </div>
  );
};

export default Statistic;
