import React from 'react';
import cn from 'classnames';

const TableHead = (props) => {
  const { config } = props;

  return (
    <div className='thead'>
      <div className='tr'>
        {config.head.map((headCell) => (
          <div className={cn('th', headCell.className)} key={headCell.id} style={headCell.style}>
            {headCell.icon}
            <span>{headCell.caption}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableHead;
