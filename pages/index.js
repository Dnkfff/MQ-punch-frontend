import React from 'react';
import { useSelector } from 'react-redux';

// components
import WelcomeBlock from '../components/page-components/main-page/WelcomeBlock/WelcomeBlock';
import StreamArea from '../components/page-components/main-page/StreamArea/StreamArea';
import LiveEvents from '../components/page-components/main-page/LiveEvents/LiveEvents';

const App = () => {
  const userIsAuth = !!useSelector((state) => state.auth.user);

  return (
    <div className='global-main-page'>
      <div className='boxers-picture-container'>
        {!userIsAuth && <WelcomeBlock />}
        <StreamArea />
      </div>
      <LiveEvents />
    </div>
  );
};

export default App;
