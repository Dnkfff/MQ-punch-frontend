import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";

// functions & constants
import { onLogIn } from "../../../../../../redux/reducers/auth/slice";

// assets
import metamaskIcon from "../../../../../../assets/website/icons/metamask.svg";
import { GrClose } from "react-icons/gr";

const AuthModal = ({ data }) => {
  const { onClose } = data;
  const dispatch = useDispatch();

  const [warningMessage, setWarningMessage] = useState(null);
  const [metamaskDoesntExist, setMetamaskDoenstExist] = useState(null);

  const logIn = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider);

      const accounts = await web3.eth.requestAccounts();

      const signature = await web3.eth.personal.sign("MQ PUNCH", accounts[0], "");

      onClose();
      dispatch(onLogIn({ signature, metamaskAddress: accounts[0] }));
    } catch (error) {
      if (error.code === 4001) {
        return accountNotSelected();
      }
      if (error.code === -32002) {
        return userNotAuthInMetamask();
      }
      if (error.toString() === "Error: Provider not set or invalid") {
        return userDoesntHaveMetamaskExtension();
      }
    }
  };

  return (
    <div className="auth-content">
      <div className="close-button" onClick={onClose}>
        <GrClose />
      </div>
      <div className="title">
        <h2 className="login-title">login</h2>
        <div className="stick" />
        <h2 className="login-title">sign-up</h2>
      </div>
      <img src={metamaskIcon.src} className="metamask-icon" />
      {metamaskDoesntExist && (
        <span className="metamask-doenst-exist">
          <i className="fas fa-times-hexagon"></i>
          <span>{metamaskDoesntExist.text}</span>
        </span>
      )}
      {!metamaskDoesntExist && (
        <>
          <button className="login-with-metamask" onClick={logIn}>
            {warningMessage ? "Try again" : "Continue using Metamask"}
          </button>
          {warningMessage && (
            <span className="warning-message">
              <i className="fas fa-exclamation-circle" />
              {warningMessage}
            </span>
          )}
        </>
      )}
      <a className="tooltip-learn" href="https://metamask.io/" target="_blank">
        <i className="fas fa-question-circle" />
        <span>{"learn about Metamask"}</span>
      </a>
    </div>
  );

  function accountNotSelected() {
    setWarningMessage("User canceled the process");
  }

  function userDoesntHaveMetamaskExtension() {
    setMetamaskDoenstExist({
      text: "You don't have active metamask extension. Please install it or activate and reload page.",
    });
  }

  function userNotAuthInMetamask() {
    setMetamaskDoenstExist({
      text: "Firstly login in metamask extension.",
    });
  }
};

export default AuthModal;
