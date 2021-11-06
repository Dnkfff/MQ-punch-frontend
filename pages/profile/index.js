import React from 'react';
import profileNoPhoto from '../../assets/website/profile_no_photo.png';
import profileNoPhotoBigger from '../../assets/website/profile_no_photo_bigger.png';

const Market = (props) => {
  return (
    <div className='global__profile'>
      {/* Profile Header */}

      <div className='profile__header'>
        <div className='profile__container'>
          <div className='profile__header__inner'>
            <div className='profile__header__photo'>
              <img src={profileNoPhoto.src} alt='no_photo' />
            </div>
            <div className='profile__header__text'>
              <div className='profile__header__data'>
                <div className='profile__header__info'>
                  <div className='profile__header__about'>
                    <div className='profile__header__name'>My Stable</div>
                    <div className='profile__header__nick'>stable 1212112</div>
                  </div>
                  <div className='profile__header__copy'>
                    <i className='far fa-clone fa-20x'></i>
                  </div>
                </div>
                <div className='profile__header__settings'>
                  <div className='profile__header__settings__link'>
                    <i className='fas fa-cog fa-100x profile__settings__icon'></i>
                    <div className='profile__settings__text'>Settings</div>
                  </div>
                </div>
              </div>
              <div className='profile__stats'>
                <div className='profile__stats__element'>
                  <div className='profile__stats__text'>THOROUGHBREDS</div>
                  <div className='profile__stats__value'>0</div>
                </div>
                <div className='profile__stats__element'>
                  <div className='profile__stats__text'>TOTAL CAREER</div>
                  <div className='profile__stats__value'>-/-/-</div>
                </div>
                <div className='profile__stats__element'>
                  <div className='profile__stats__text'>WIN RATE</div>
                  <div className='profile__stats__value'>--%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Stable */}

      <div className='profile__stable'>
        <div className='profile__container'>
          <div className='profile__stable__inner'>
            <h1 className='profile__stable__title'>Your stable is currently empty.</h1>
            <h2 className='profile__stable__subtitle'>
              Buy a racehourse from ZED RUN’s Marketplace and start your legasy now!
            </h2>
          </div>
        </div>
      </div>

      {/* Profile Offer */}
      <div className='profile__offer'>
        <div className='profile__container'>
          <div className='profile__offer__inner profile__block__style'>
            <h1 className='profile__offer__title'>Send a friend 5% off their first racehorse</h1>
            <div className='profile__offer__subtitle'>
              To say thanks, we will send you 5 % off your next racehours
            </div>
            <form action=' ' className='profile__offer__form'>
              <input className='profile__offer__input' placeholder='Enter email' />
              <button className='profile__btn' type='button'>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Profile Navigation*/}

      <div className='profile__settings'>
        <nav className='profile__settings__nav'>
          <a href='' className='profile__nav__element profile__nav__element-activ'>
            {' '}
            <i className='fas fa-user-circle profile__nav__icon'></i>
            <div className='profile__nav__text'>General</div>{' '}
          </a>
          <a href='' className='profile__nav__element'>
            <i className='fas fa-bell profile__nav__icon'></i>
            <div className='profile__nav__text'>Notifications</div>{' '}
          </a>
          <a href='' className='profile__nav__element'>
            <i className='fas fa-cogs profile__nav__icon'></i>
            <div className='profile__nav__text'>Advanced</div>{' '}
          </a>
        </nav>
      </div>

      {/* Profile Transfer*/}

      <div className='profile__transfer'>
        <div className='profile__container'>
          <div className='profile__transfer__inner profile__block__style'>
            <div className='profile__transfer__title'>Transfer your racehorses</div>
            <div className='profile__transfer__subtitle'>
              You have 0 racehorses on your wallet linked to email. You can transfer them to your
              metask wallet or others.
            </div>
            <button className='profile__btn' type='button'>
              Select Racehourse
            </button>
          </div>
        </div>
      </div>

      {/* Profile General*/}

      <div className='profile__general'>
        <div className='profile__container'>
          <div className='profile__general__inner profile__block__style'>
            <div className='profile__general__data'>
              <form className='profile__general__form'>
                <div className='profile__general__titile'>General</div>
                <div className='profile__general__subtitle'>STABLE TITLE</div>
                <input className='profile__general__input' placeholder='stable 1212112' />
                <div className='profile__general__subtitle'>STABLE DESCRIPTION</div>
                <textarea
                  className='profile__general__description '
                  placeholder='Enter your stable description...'
                />
                <div className='profile__general__description__comment'>
                  A short and creative description that represents your stable.{' '}
                </div>
                <div className='profile__general__subtitle'>EMAIL</div>
                <input className='profile__general__input' placeholder='12221212zzw@gmail.com' />
                <div className='profile__general__subtitle'>DISCORD</div>
                <input className='profile__general__input' placeholder='username#xxxx' />
              </form>
              <div className='profile__general__photo'>
                <div className='profile__general__photo__title'>STABLE IMAGE</div>
                <div className='profile__general__icon'>
                  <img src={profileNoPhotoBigger.src} alt='no_photo' className='' />
                  <i className='fas fa-plus-square profile__general__add'></i>
                </div>
              </div>
            </div>

            {/* Profile General - confirm*/}

            <div className='profile__general__confirm'>
              <div className='profile__general__update'>
                <input type='checkbox' className='profile__general__checkbox' />I am sure I want to
                update
              </div>
              <button className='profile__btn' type='button'>
                Save Changes
              </button>
              <button className='profile__btn' type='button'>
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
