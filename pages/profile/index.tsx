import React from 'react';

// components
import MainProfileInfo from '../../components/page-components/profile/MainProfileInfo/MainProfileInfo';

const Profile: React.FC = () => {
  return (
    <div className='global__profile'>
      <MainProfileInfo />
      <section className='boxers_info'>
        <div className='boxers_info_total_bar'></div>
        <div className='boxers_list'></div>
      </section>
    </div>
  );
};

export default Profile;
