import React from "react";

import { getUUID } from "../../../../inside-services/get-uuid/get-uuid";

const BOXERS_LIST = [
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
  { id: getUUID() },
];

const BoxersList = () => {
  return (
    <div className="boxers-list">
      <h3>Boxers from store</h3>
      <div className="boxers-list-wrapper">
        <iframe
          src="https://testnets.opensea.io/collection/mq-punch?embed=true"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default BoxersList;
