import React from 'react';
import { useTypedSelector } from '../../../../redux/store';

// assets
import ChartDiagramIcon from '../../../../assets/website/profile/chart-diagram.svg';
import ChartIcon from '../../../../assets/website/profile/chart.svg';
import TrophiesIcon from '../../../../assets/website/profile/trophies.svg';

const Statistic: React.FC = () => {
  const avgRating = useTypedSelector((state) => state.profile.avgRating);
  const earnings = useTypedSelector((state) => state.profile.earnings);
  const winrate = useTypedSelector((state) => state.profile.winrate);

  const earningsString = earnings ? (+earnings).toFixed(4) : '0';
  const lossesCount =
    winrate && winrate.numberOfWins !== null && winrate.numberOfFights !== null
      ? +winrate.numberOfFights - +winrate.numberOfWins
      : 0;
  const winsCount = winrate && winrate.numberOfWins !== null ? winrate.numberOfWins : 0;
  const winratePercent =
    winrate &&
    winrate.numberOfWins !== null &&
    winrate.numberOfFights !== null &&
    +winrate.numberOfFights !== 0
      ? (+winrate.numberOfWins / +winrate.numberOfFights).toFixed(0)
      : 0;

  return (
    <div className='boxers_info_total_bar'>
      <div className='statistic-item'>
        <div className='statistic-icon'>
          <ChartDiagramIcon />
        </div>
        <div className='statistic-winrate'>
          <span className='statistic-text'>{winratePercent}%</span>
          <span className='statistic-text'>
            ({winsCount}-{lossesCount})
          </span>
        </div>
      </div>
      <div className='statistic-item'>
        <div className='statistic-icon'>
          <TrophiesIcon />
        </div>
        <span className='statistic-text'>{avgRating || '0'}</span>
      </div>
      <div className='statistic-item'>
        <div className='statistic-icon'>
          <ChartIcon />
        </div>
        <span className='statistic-text'>{earningsString} ETH</span>
      </div>
    </div>
  );
};

export default Statistic;
