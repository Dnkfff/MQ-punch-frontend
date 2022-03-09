import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// components
import MainProfileInfo from '../../components/page-components/profile/MainProfileInfo/MainProfileInfo';
import ProfileStatistic from '../../components/page-components/profile/Statistic/Statistic';
import BoxersList from '../../components/page-components/profile/BoxersList/BoxersList';

// functions
import { getAnotherUserProfileInfo } from '../../redux/reducers/profile/slice';

export interface IProfile {
  userId: string | null;
}

const Profile: React.FC<IProfile> = ({ userId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserProfile = () => {
      if (userId) {
        dispatch(getAnotherUserProfileInfo({ userId }));
      }
    };
    getUserProfile();
  }, [userId]);

  return (
    <div className='global__profile'>
      <MainProfileInfo isAnother={!!userId} />
      <section className='boxers_info'>
        <ProfileStatistic isAnother={!!userId} />
        <BoxersList isAnother={!!userId} />
      </section>
    </div>
  );
};

export default Profile;
