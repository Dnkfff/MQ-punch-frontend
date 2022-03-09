import React from 'react';
import { useRouter } from 'next/router';

// components
import Profile from './index';

const AnotherUserProfile = () => {
  const router = useRouter();
  const userId = router.query.userId as string;

  return <Profile userId={userId} />;
};

export default AnotherUserProfile;
