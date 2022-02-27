import React, { useState } from 'react';
import cn from 'classnames';
import { useTypedSelector } from '../../../../redux/store';
import { useDispatch } from 'react-redux';

// components
import { IconButtonWithTooltip } from '../../../UI/icon_buttons/IconButtonWithTooltip/IconButtonWithTooltip';

// constants
import { IInputItem } from '../../../../inside-services/types/form/form';

// redux
import { setEditMode } from '../../../../redux/reducers/profile/slice';

// assets
import ImageContainer from '../../../../assets/website/profile/image-container.svg';
import SettingsIcon from '../../../../assets/website/profile/settings.svg';

interface IEditForm {
  email: IInputItem;
  username: IInputItem;
  discord: IInputItem;
}

const DEFAULT_EDIT_FORM_FROM_REDUX = (profileInfoFromRedux: any) => ({
  email: {
    value: profileInfoFromRedux && profileInfoFromRedux.email ? profileInfoFromRedux.email : '',
    required: true,
    placeholder: 'Enter your email address',
    type: 'text',
    formatFunction: ({ newVal, oldVal }) => {
      const regex1 = /^.{0,30}$/;
      const regex2 = /^$/;

      if (!regex1.test(newVal) && !regex2.test(newVal) && newVal !== '') return oldVal;

      return newVal;
    },
  },
  username: {
    value:
      profileInfoFromRedux && profileInfoFromRedux.username ? profileInfoFromRedux.username : '',
    required: true,
    placeholder: 'Enter new nickname',
    type: 'text',
    formatFunction: ({ newVal, oldVal }) => {
      const regex1 = /^.{0,30}$/;
      const regex2 = /^$/;

      if (!regex1.test(newVal) && !regex2.test(newVal) && newVal !== '') return oldVal;

      return newVal;
    },
  },
  discord: {
    value: profileInfoFromRedux && profileInfoFromRedux.discord ? profileInfoFromRedux.discord : '',
    required: true,
    placeholder: 'Enter your discord nickname',
    type: 'text',
    formatFunction: ({ newVal, oldVal }) => {
      const regex1 = /^.{0,30}$/;
      const regex2 = /^$/;

      if (!regex1.test(newVal) && !regex2.test(newVal) && newVal !== '') return oldVal;

      return newVal;
    },
  },
});

const MainProfileInfo: React.FC = () => {
  const dispatch = useDispatch();
  const editMode = useTypedSelector((state) => state.profile.edit_mode);
  const profileInfoFromRedux = useTypedSelector((state) => state.profile.profile);
  const [editForm, setEditForm] = useState<null | IEditForm>(
    DEFAULT_EDIT_FORM_FROM_REDUX(profileInfoFromRedux)
  );

  const ethBalance: string =
    profileInfoFromRedux && typeof profileInfoFromRedux.ethBalance === 'number'
      ? profileInfoFromRedux.ethBalance.toFixed(4)
      : '';
  const walletAddress: string =
    profileInfoFromRedux && profileInfoFromRedux.ethAccountId
      ? profileInfoFromRedux.ethAccountId.slice(0, 4) +
        '...' +
        profileInfoFromRedux.ethAccountId.slice(-3)
      : '';

  const onChangeFormItem = ({ value, field }: { value: string; field: string }) => {
    let newValue = value;
    if (editForm && editForm[field].formatFunction) {
      newValue = editForm[field].formatFunction({ newVal: value, oldVal: editForm[field].value });
    }
    setEditForm({ ...editForm, [field]: { ...editForm[field], value: newValue } });
  };

  return (
    <section className='profile_info'>
      {editMode && (
        <>
          <IconButtonWithTooltip
            className='profile-global-save-icon'
            onClick={() => {
              dispatch(setEditMode(false));
            }}
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
            onClick={() => {
              dispatch(setEditMode(false));
            }}
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
          onClick={() => {
            dispatch(setEditMode(true));
            setEditForm(DEFAULT_EDIT_FORM_FROM_REDUX(profileInfoFromRedux));
          }}
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
            {!editMode && (
              <h3 className='nickname'>{profileInfoFromRedux?.username || '17etro'}</h3>
            )}
            {editMode && (
              <input
                className='nickname-input'
                value={editForm.username.value}
                onChange={(e) => onChangeFormItem({ value: e.target.value, field: 'username' })}
                placeholder={editForm.username.placeholder}
              />
            )}
            <div className='wallet'>
              <div className='balance'>
                <span className='label'>balance:</span>
                <span className='value'>{ethBalance} ETH</span>
              </div>
              <div className='balance'>
                <span className='label'>wallet:</span>
                <span className='value'>{walletAddress}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='profile_info_content__inputs'>
          <div className='profile-input-item'>
            <label htmlFor='email'>Email:</label>
            <input
              type={editForm.email.type}
              id='email'
              disabled={!editMode}
              onChange={(e) => onChangeFormItem({ value: e.target.value, field: 'email' })}
              placeholder={editForm.email.placeholder}
              value={!editMode ? profileInfoFromRedux.email || '' : editForm.email.value}
            />
          </div>
          <div className='profile-input-item'>
            <label htmlFor='discord'>Discord:</label>
            <input
              type={editForm.discord.type}
              placeholder={editForm.discord.placeholder}
              id='discord'
              disabled={!editMode}
              onChange={(e) => onChangeFormItem({ value: e.target.value, field: 'discord' })}
              value={!editMode ? profileInfoFromRedux.discord || '' : editForm.discord.value}
            />
          </div>
        </div>
        <div className='profile_info_content__settings'>
          <button className='notifications-button'>
            <SettingsIcon />
            <span>Notifications</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainProfileInfo;
