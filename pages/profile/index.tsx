import React from 'react';

// components
import MainProfileInfo from '../../components/page-components/profile/MainProfileInfo/MainProfileInfo';
import ProfileStatistic from '../../components/page-components/profile/Statistic/Statistic';
import BoxersList from '../../components/page-components/profile/BoxersList/BoxersList';

const Profile: React.FC = () => {
  return (
    <div className='global__profile'>
      <MainProfileInfo />
      <section className='boxers_info'>
        <ProfileStatistic />
        <BoxersList />
      </section>
    </div>
  );
};

export default Profile;
