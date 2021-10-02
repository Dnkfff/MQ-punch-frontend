import React from 'react';
import cn from 'classnames';

// components
import { TableHead, TableBody } from './components';

const Table = (props) => {
  const { config } = props;
  const tableClassName = config ? config.type : '';

  return (
    <div className={cn('mq-punch-table', tableClassName)}>
      <TableHead config={config} />
      <TableBody config={config} />
    </div>
  );
};

export default Table;
