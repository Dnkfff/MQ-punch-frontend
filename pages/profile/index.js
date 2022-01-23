import React, { useState } from 'react';

const Profile = () => {
  const [globalEditMode, setGlobalEditMode] = useState(false);

  return (
    <div className='global__profile'>
      <section className='profile_info'>
        {globalEditMode && (
          <>
            <button className='profile-global-save-icon' onClick={() => setGlobalEditMode(false)}>
              <i className='fas fa-save' />
            </button>
            <button className='profile-global-cancel-icon' onClick={() => setGlobalEditMode(false)}>
              <i className='fas fa-times' />
            </button>
          </>
        )}
        {!globalEditMode && (
          <button className='profile-global-edit-icon' onClick={() => setGlobalEditMode(true)}>
            <i className='fas fa-pen' />
          </button>
        )}
      </section>
      <section className='boxers_info'>
        <div className='boxers_info_total_bar'></div>
        <div className='boxers_list'></div>
      </section>
    </div>
  );
};

export default Profile;
