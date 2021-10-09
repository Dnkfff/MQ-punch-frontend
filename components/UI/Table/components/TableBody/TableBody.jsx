import React from 'react';

// table templates
import { LeaderboardTableBody } from './TableBodyTemplates';

const tableBodyRowsTemplate = (config) =>
  ({
    leaderboard: <LeaderboardTableBody config={config} />,
  }[config.name]);

const TableBody = (props) => {
  const { config } = props;

  const tableBodyRows = tableBodyRowsTemplate(config);

  return <div className='tbody'>{tableBodyRows}</div>;
};

export default TableBody;
