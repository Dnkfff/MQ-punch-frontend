import React, { useState } from 'react';
import cn from 'classnames';
import { useTypedSelector } from '../../../../redux/store';
import { useDispatch } from 'react-redux';

// components
import { IconButtonWithTooltip } from '../../../UI/icon_buttons/IconButtonWithTooltip/IconButtonWithTooltip';

// constants
import { IInputItem } from '../../../../inside-services/types/form/form';

// redux
import { setEditMode, updateUserProfile } from '../../../../redux/reducers/profile/slice';

// assets
import ImageContainer from '../../../../assets/website/profile/image-container.svg';
import SettingsIcon from '../../../../assets/website/profile/settings.svg';

interface IEditForm {
  email: IInputItem;
  username: IInputItem;
  discord: IInputItem;
}

interface IMainProfileInfo {
  isAnother: boolean;
}

const DEFAULT_EDIT_FORM_FROM_REDUX = (userInfoFromRedux: any) => ({
  email: {
    value: userInfoFromRedux && userInfoFromRedux.email ? userInfoFromRedux.email : '',
    required: true,
    isValid: userInfoFromRedux && userInfoFromRedux.email ? userInfoFromRedux.email !== '' : false,
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
    value: userInfoFromRedux && userInfoFromRedux.username ? userInfoFromRedux.username : '',
    required: true,
    isValid:
      userInfoFromRedux && userInfoFromRedux.username ? userInfoFromRedux.username !== '' : false,
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
    value: userInfoFromRedux && userInfoFromRedux.discord ? userInfoFromRedux.discord : '',
    required: true,
    isValid:
      userInfoFromRedux && userInfoFromRedux.discord ? userInfoFromRedux.discord !== '' : false,
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

const MainProfileInfo: React.FC<IMainProfileInfo> = ({ isAnother }) => {
  const dispatch = useDispatch();
  const editMode = useTypedSelector((state) => state.profile.edit_mode);
  const userInfoFromReduxLabel = isAnother ? 'another_user_profile' : 'user';
  const userInfoFromRedux = useTypedSelector((state) => state.profile[userInfoFromReduxLabel]);
  const [editForm, setEditForm] = useState<null | IEditForm>(
    DEFAULT_EDIT_FORM_FROM_REDUX(userInfoFromRedux)
  );

  const ethBalance: string =
    userInfoFromRedux && typeof userInfoFromRedux.ethBalance === 'number'
      ? userInfoFromRedux.ethBalance.toFixed(4)
      : '';
  const walletAddress: string =
    userInfoFromRedux && userInfoFromRedux.ethAccountId
      ? userInfoFromRedux.ethAccountId.slice(0, 4) +
        '...' +
        userInfoFromRedux.ethAccountId.slice(-3)
      : '';

  const onChangeFormItem = ({ value, field }: { value: string; field: string }) => {
    let newValue = value;
    if (editForm && editForm[field].formatFunction) {
      newValue = editForm[field].formatFunction({ newVal: value, oldVal: editForm[field].value });
    }
    setEditForm({
      ...editForm,
      [field]: { ...editForm[field], value: newValue, isValid: newValue !== '' },
    });
  };

  const saveProfileDisabled =
    !editForm.username.isValid || !editForm.discord.isValid || !editForm.email.isValid;

  return (
    <section className='profile_info'>
      {editMode && !isAnother && (
        <>
          <IconButtonWithTooltip
            className={cn('profile-global-save-icon', { disabled: saveProfileDisabled })}
            onClick={
              !saveProfileDisabled
                ? () =>
                    dispatch(
                      updateUserProfile({
                        email: editForm.email.value,
                        discord: editForm.discord.value,
                        username: editForm.username.value,
                      })
                    )
                : () => {}
            }
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
      {!editMode && !isAnother && (
        <IconButtonWithTooltip
          className='profile-global-edit-icon'
          onClick={() => {
            dispatch(setEditMode(true));
            setEditForm(DEFAULT_EDIT_FORM_FROM_REDUX(userInfoFromRedux));
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
            {!editMode && <h3 className='nickname'>{userInfoFromRedux?.username || '-'}</h3>}
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
              value={!editMode ? userInfoFromRedux?.email || '' : editForm.email.value}
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
              value={!editMode ? userInfoFromRedux?.discord || '' : editForm.discord.value}
            />
          </div>
        </div>
        {!isAnother && (
          <div className='profile_info_content__settings'>
            <button className='notifications-button'>
              <SettingsIcon />
              <span>Notifications</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MainProfileInfo;
