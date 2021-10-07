import React, { useState, useEffect } from 'react';

// components
import { SelectDivisionSlider, PlayersTable } from './components';

const LeaderBoard = () => {
  const [setSelectedDivisionId, setDelectedDivisionId] = useState(0);

  return (
    <div className='leaderboard'>
      <h3>leaderboard</h3>
      <SelectDivisionSlider />
      <PlayersTable />
    </div>
  );
};

export default LeaderBoard;
