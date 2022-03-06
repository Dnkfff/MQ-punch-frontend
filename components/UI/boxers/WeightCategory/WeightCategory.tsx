import React from 'react';

const WeightCategory = ({ category }: { category: string }) => {
  return (
    <div className='mq-punch-boxer-weight-category'>
      <span className='weight-category-label'>{category}</span>
    </div>
  );
};

export default WeightCategory;
