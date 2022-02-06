import React, { useState } from 'react';

// components
import { IconButtonWithTooltip } from '../../components/UI/icon_buttons';

const Profile: React.FC = () => {
  const [globalEditMode, setGlobalEditMode] = useState<boolean>(false);

  return (
    <div className='global__profile'>
      <section className='profile_info'>
        {globalEditMode && (
          <>
            <IconButtonWithTooltip
              className='profile-global-save-icon'
              onClick={() => setGlobalEditMode(false)}
              tooltip={{
                content: 'Save',
                place: 'top',
                effect: 'solid',
                type: 'light',
              }}
            >
              <i className='fas fa-save' />
            </IconButtonWithTooltip>
            <IconButtonWithTooltip
              className='profile-global-cancel-icon'
              onClick={() => setGlobalEditMode(false)}
              tooltip={{
                content: 'Cancel',
                place: 'top',
                effect: 'solid',
                type: 'light',
              }}
            >
              <i className='fas fa-times' />
            </IconButtonWithTooltip>
          </>
        )}
        {!globalEditMode && (
          <IconButtonWithTooltip
            className='profile-global-edit-icon'
            onClick={() => setGlobalEditMode(true)}
            tooltip={{
              content: 'Edit',
              place: 'top',
              effect: 'solid',
              type: 'light',
            }}
          >
            <i className='fas fa-pen' />
          </IconButtonWithTooltip>
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
