import React from "react";
import profileNoPhoto from "../../assets/website/profile_no_photo.png";

const Market = (props) => {
  return (
    <div className="global__profile">
      <div className="profile__header">
        <div className="profile__container">
          <div className="profile__header__inner">
            <div className="profile__header__photo">
              <img src={profileNoPhoto.src} alt="no_photo" className="" />
            </div>
            <div className="profile__header__text">
              <div className="profile__header__data">
                <div className="profile__header__info">
                  <div className="profile__header__about">
                    <div className="profile__header__name">My Stable</div>
                    <div className="profile__header__nick">stable 1212112</div>
                  </div>
                  <div className="profile__header__copy">
                    <i className="far fa-clone fa-20x"></i>
                  </div>
                </div>
                <div className="profile__header__settings">
                  <div className="profile__settings__text">
                    Settings
                    <i className="fas fa-cog fa-100x profile__settings__icon"></i>
                  </div>
                </div>
              </div>
              <div className="profile__stats">
                <div className="profile__stats__element">
                  <div className="profile__stats__text">THOROUGHBREDS</div>
                  <div className="profile__stats__value">0</div>
                </div>
                <div className="profile__stats__element">
                  <div className="profile__stats__text">TOTAL CAREER</div>
                  <div className="profile__stats__value">-/-/-</div>
                </div>
                <div className="profile__stats__element">
                  <div className="profile__stats__text">WIN RATE</div>
                  <div className="profile__stats__value">--%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile__stable">
        <div className="profile__container">
          <div className="profile__stable__inner">
            <h1 className="profile__stable__title">
              Your stable is currently empty.
            </h1>
            <h2 className="profile__stable__subtitle">
              Buy a racehourse from ZED RUN’s Marketplace and start your legasy
              now!
            </h2>
          </div>
        </div>
      </div>

      <div className="profile__offer">
        <div className="profile__container">
          <div className="profile__offer__inner profile__block__style">
            <h1 className="profile__offer__title">
              Send a friend 5% off their first racehorse
            </h1>
            <div className="profile__offer__subtitle">
              To say thanks, we will send you 5 % off your next racehours
            </div>
            <form action=" " className="profile__offer__form">
              <input className="profile__offer__input" />
              <button className="profile__offer__btn" type="button">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="profile__settings">
        <nav className="profile__settings__nav">
          <a
            href=""
            className="profile__nav__element profile__nav__element-activ">
            {" "}
            <i className="fas fa-user-circle profile__nav__icon"></i>
            <div className="profile__nav__text">To say thanks,</div>{" "}
          </a>
          <a href="" className="profile__nav__element">
            <i className="fas fa-bell profile__nav__icon"></i>
            <div className="profile__nav__text">To say thanks,</div>{" "}
          </a>
          <a href="" className="profile__nav__element">
            <i className="fas fa-cogs profile__nav__icon"></i>
            <div className="profile__nav__text">To say thanks,</div>{" "}
          </a>
        </nav>
      </div>

      <div className="profile__transfer">
        <div className="profile__container">
          <div className="profile__transfer__inner profile__block__style">
            <h1 className="profile__transfer__title">
              Send a friend 5% off their first racehorse
            </h1>
            <div className="profile__transfer__subtitle">
              To say thanks, we will send you 5 % off your next racehours
            </div>
            <form action=" " className="profile__offer__form">
              <div className="profile__offer__">Enter email</div>
            </form>
          </div>
        </div>
      </div>

      <div className="profile__test">
        <p className="profile__test_p"> 1</p>
        <p className="profile__test_p"> 2</p>
        <p className="profile__test_p"> 3</p>
        <p className="profile__test_p"> 4</p>
        <p className="profile__test_p"> 5</p>
        <p className="profile__test_p"> 6</p>
        <p className="profile__test_p"> 7</p>
        <p className="profile__test_p"> 8</p>
        <p className="profile__test_p">9 </p>
        <p className="profile__test_p"> 1</p>
        <p className="profile__test_p"> 2</p>
        <p className="profile__test_p"> 3</p>
        <p className="profile__test_p"> 4</p>
        <p className="profile__test_p"> 5</p>
        <p className="profile__test_p"> 6</p>
        <p className="profile__test_p"> 7</p>
        <p className="profile__test_p"> 8</p>
        <p className="profile__test_p">9 </p>
        <p className="profile__test_p"> 1</p>
        <p className="profile__test_p"> 2</p>
        <p className="profile__test_p"> 3</p>
        <p className="profile__test_p"> 4</p>
        <p className="profile__test_p"> 5</p>
        <p className="profile__test_p"> 6</p>
        <p className="profile__test_p"> 7</p>
        <p className="profile__test_p"> 8</p>
        <p className="profile__test_p">9 </p>
      </div>
    </div>
  );
};

export default Market;
