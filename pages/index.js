import React from 'react';

import WelcomeBlock from '../components/page-components/main-page/WelcomeBlock/WelcomeBlock';
import StreamArea from '../components/page-components/main-page/StreamArea/StreamArea';

const App = () => {
  return (
    <div className='global-main-page'>
      <WelcomeBlock />
      <StreamArea />
    </div>
  );
};

export default App;
