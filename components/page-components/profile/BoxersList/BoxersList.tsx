import React from 'react';
import Link from 'next/link';

const BoxersList: React.FC = () => {
  return (
    <div className='boxers_list'>
      <div className='visit-market'>
        <h3>You don't have any boxers yet.</h3>
        <span className='market-text'>
          Visit <Link href={'/market'}>MQ Punch Market</Link> to get your first fighter
        </span>
      </div>
    </div>
  );
};

export default BoxersList;