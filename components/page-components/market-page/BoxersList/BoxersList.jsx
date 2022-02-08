import React from 'react';

import { getUUID } from '../../../../inside-services/get-uuid/get-uuid';
import BoxerItem from '../BoxerItem/BoxerItem';


const BOXERS_LIST = [
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() }
];

const BoxersList = () => {
  return (
    <div className='boxers-list'>
      {BOXERS_LIST.map(boxer => {
        return <BoxerItem />;
      })}
    </div>
  );
};

export default BoxersList;
