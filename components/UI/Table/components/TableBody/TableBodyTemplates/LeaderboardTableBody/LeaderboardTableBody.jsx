import React from 'react';
import cn from 'classnames';

const LeaderboardTableBody = (props) => {
  const { config } = props;
  const { body, head } = config;

  return (
    <>
      {body.map((bodyCell) => (
        <div className='tr' key={bodyCell.id}>
          <div className={cn('th', head[0].className, 'leaderboard-number')} style={head[0].style}>
            <span>{bodyCell.number.caption}</span>
          </div>
          <div className={cn('th', head[1].className, 'leaderboard-name')} style={head[1].style}>
            <div className='logo' />
            <span>{bodyCell.name.caption}</span>
          </div>
          <div className={cn('th', head[2].className, 'leaderboard-winrate')} style={head[2].style}>
            <span>{bodyCell.winrate.caption}</span>
          </div>
          <div
            className={cn('th', head[3].className, 'leaderboard-trophies')}
            style={head[3].style}
          >
            <span>{bodyCell.trophies.caption}</span>
          </div>
          <div className={cn('th', head[4].className, 'leaderboard-prize')} style={head[4].style}>
            <span>{bodyCell.prize.caption}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default LeaderboardTableBody;
