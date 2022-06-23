import React from 'react';
import { toast } from '../../containers/TooltipsProvider/TooltipsProvider';


const Leaderboard = (props) => {
  return <>
    <button onClick={() =>
      toast.infoMessage(
        {
          title: 'Successful Withdraw',
          content: 'You have successfully withdraw 124 NEAR'
        }
      )
    }>
      info
    </button>
    <button onClick={() => toast.errorMessage()}>
      error
    </button>
  </>;
};

export default Leaderboard;
