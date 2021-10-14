import React from "react";

// components
import MqPunchCard from "./components/MQPunchCard";
import MetamaskCard from "./components/MetamaskCard";

const Balance = ({ data }) => {
  return (
    <div className="balance-content">
      <div className="balance-content-header">
        <div className="close-button" onClick={data.onClose}>
          <i className="fas fa-times" />
        </div>

        <div className="transfer-block">
          <MqPunchCard />
          <div className="actions-area">
            <button className="deposit">WITHDRAW</button>
            <div className="transfer-icon">
              <i className="fad fa-exchange" />
            </div>
            <button className="withdraw">DEPOSIT</button>
            <span className="beta">deposit by currency (Beta)</span>
          </div>
          <MetamaskCard />
        </div>
      </div>
      <div className="balance-content-body"></div>
    </div>
  );
};

export default Balance;
