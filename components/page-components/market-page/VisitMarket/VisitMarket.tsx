import React from 'react';
import Link from 'next/link';

const VisitMarket = () => {
  return (
    <div className='mq-punch-visit-market'>
      <h3>You don't have any boxers yet.</h3>
      <span className='market-text'>
        Visit <Link href={'/market'}>MQ Punch Market</Link> to get your first fighter
      </span>
      <span className='info-msg'>
        If you have already bought fighter and have it in your wallet please relogin to see updates
      </span>
    </div>
  );
};

export { VisitMarket };
