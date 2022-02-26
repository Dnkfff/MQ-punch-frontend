import React from 'react';
import cn from 'classnames';
import { useTypedSelector } from '../../../../redux/store';
import { useDispatch } from 'react-redux';

// components
import { IconButtonWithTooltip } from '../../../UI/icon_buttons/IconButtonWithTooltip/IconButtonWithTooltip';

// redux
import { setEditMode } from '../../../../redux/reducers/profile/slice';

// assets
import ImageContainer from '../../../../assets/website/profile/image-container.svg';

const MainProfileInfo: React.FC = () => {
  const dispatch = useDispatch();
  const editMode = useTypedSelector((state) => state.profile.edit_mode);

  return (
    <section className='profile_info'>
      {editMode && (
        <>
          <IconButtonWithTooltip
            className='profile-global-save-icon'
            onClick={() => dispatch(setEditMode(false))}
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
            onClick={() => dispatch(setEditMode(false))}
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
      {!editMode && (
        <IconButtonWithTooltip
          className='profile-global-edit-icon'
          onClick={() => dispatch(setEditMode(true))}
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
      <div className='profile_info_content'>
        <div className='profile_info_content__header'>
          <div className='image-container'>
            <ImageContainer />
          </div>
          <div className='nickname-wallet'>
            <h3 className='nickname'>17etro</h3>
            <div className='wallet'>
              <div className='balance'>
                <span className='label'>balance:</span>
                <span className='value'>0.000 ETH</span>
              </div>
              <div className='balance'>
                <span className='label'>wallet:</span>
                <span className='value'>0x05c...08d</span>
              </div>
            </div>
          </div>
        </div>
        <div className='profile_info_content__inputs'>
          <div className='profile-input-item'>
            <label htmlFor='email'>Email:</label>
            <input type='text' placeholder='enter your email address' id='email' />
          </div>
          <div className='profile-input-item'>
            <label htmlFor='discord'>Discord:</label>
            <input type='text' placeholder='enter your discord nickname' id='discord' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainProfileInfo;
