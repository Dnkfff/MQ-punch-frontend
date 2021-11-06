import React from "react";

// assets
import MetamaskIcon from "../../../../../../../assets/website/icons/metamask.svg";

const MetamaskCard = () => {
  return (
    <div className="metamask-card">
      <div className="ethereum-card-content">
        <h2 className="card-title">METAMASK Balance</h2>
        <div className="logo">
          <MetamaskIcon />
        </div>
        <span className="convertation">
          <b>$ 3,155.20</b>
        </span>
        <div className="card-balance">
          <div className="crypto-icon">
            <i className="fab fa-ethereum"></i>
            <span>ETH</span>
          </div>
          <span className="balance">3.1200 ETH</span>
        </div>
      </div>
    </div>
  );
};

export default MetamaskCard;
