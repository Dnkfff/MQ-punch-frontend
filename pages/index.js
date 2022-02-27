import React from 'react';
import { useSelector } from 'react-redux';

// components
import WelcomeBlock from '../components/page-components/main-page/WelcomeBlock/WelcomeBlock';
import StreamArea from '../components/page-components/main-page/StreamArea/StreamArea';
import LiveEvents from '../components/page-components/main-page/LiveEvents/LiveEvents';
import LeaderBoard from '../components/page-components/main-page/LeaderBoard/LeaderBoard';

const App = () => {
  const userIsAuth = !!useSelector((state) => state.auth.user);

  return (
    <div className='global-main-page'>
      <div className='boxers-picture-container'>
        {!userIsAuth && <WelcomeBlock />}
        {/* <StreamArea /> */}
      </div>
      <LiveEvents />
      <div className='leaderboard-container'>
        <LeaderBoard />
        <div className='first-left-shape'>
          <div />
          <div />
        </div>
        <div className='second-left-shape'>
          <div />
          <div />
        </div>
        <div className='first-right-shape'>
          <div />
          <div />
        </div>
        <div className='second-right-shape'>
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};

export default App;
