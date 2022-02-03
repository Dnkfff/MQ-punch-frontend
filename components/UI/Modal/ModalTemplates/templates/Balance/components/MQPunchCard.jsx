import React from "react";

// assets
import logo_glove from "../../../../../../../assets/website/logos/mq-punch-logo-small.png";

const MQPunchCard = () => {
  return (
    <div className="ethereum-card">
      <div className="ethereum-card-content">
        <h2 className="card-title">MQ-PUNCH Balance</h2>
        <div className="logo">
          <img src={logo_glove.src} alt="" />
        </div>
        <span className="convertation">
          <b>$ 1,576.10</b>
        </span>
        <div className="card-balance">
          <div className="crypto-icon">
            <i className="fab fa-ethereum"></i>
            <span>ETH</span>
          </div>
          <span className="balance">1.5300 ETH</span>
        </div>
      </div>
    </div>
  );
};

export default MQPunchCard;
