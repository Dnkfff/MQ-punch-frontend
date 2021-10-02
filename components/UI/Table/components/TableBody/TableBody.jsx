import React from 'react';

const TableBody = (props) => {
  const { config } = props;
  const { head, body } = config;

  return (
    <div className='tbody'>
      {body.map((bodyCell) => (
        <div className='tr' key={bodyCell.id}>
          {head.map((headCell) => (
            <div className='th' key={headCell.id + bodyCell.id} style={headCell.style}>
              <span>{bodyCell[headCell.field].caption}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableBody;
