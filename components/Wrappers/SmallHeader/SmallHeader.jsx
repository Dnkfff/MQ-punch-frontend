import React from 'react';

// assets
import logotype from '../../../assets/website/mq-punch-logo-small.png';
import { HiMenuAlt2 } from 'react-icons/hi';

const SmallHeader = (props) => {
  const { showStickyHeader } = props;

  const smallHeaderClassName = `app-container-small-header ${showStickyHeader ? 'opened' : 'closed'}`;

  return (
    <div className={smallHeaderClassName}>
      <div className='left'>
        <div className='logotype'>
          <img src={logotype.src} alt='MQPUNCH' />
        </div>
        <div className='menu-icon'>
          <HiMenuAlt2 />
        </div>
      </div>
    </div>
  );
};

export default SmallHeader;
