import React from 'react';
import Link from 'next/link';
import { useTypedSelector } from '../../../../redux/store';

// components
import Boxer from '../../../UI/boxers/ProfileBoxer/ProfileBoxer';

const BoxersList: React.FC = () => {
  const boxers = useTypedSelector((state) => state.profile.boxers);
  console.log(boxers);

  return (
    <div className='boxers_list'>
      {boxers && boxers.length !== 0 && (
        <>
          <h4 className='boxers-list-title'>YOUR BOXERS</h4>
          <div className='row'>
            {boxers.map((boxer) => (
              <Boxer />
            ))}
          </div>
        </>
      )}
      {!boxers && (
        <div className='visit-market'>
          <h3>You don't have any boxers yet.</h3>
          <span className='market-text'>
            Visit <Link href={'/market'}>MQ Punch Market</Link> to get your first fighter
          </span>
          <span className='info-msg'>
            If you have already bought fighter and have it in your wallet please relogin to see
            updates
          </span>
        </div>
      )}
    </div>
  );
};

export default BoxersList;
