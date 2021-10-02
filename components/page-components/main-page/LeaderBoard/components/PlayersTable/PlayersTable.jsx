import React from 'react';

// components
import Table from '../../../../../UI/Table/Table';

// constants
import { playersTableHead, playersTableBody } from './contants';

const PlayersTable = () => {
  return (
    <div className='players-table'>
      <Table
        config={{
          type: 'black-head-table',
          head: playersTableHead,
          body: playersTableBody,
        }}
      />
    </div>
  );
};

export default PlayersTable;
