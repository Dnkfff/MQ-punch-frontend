import React from "react";

// components
import OpenSeaBanner from "../../components/page-components/market-page/OpenSeaBanner/OpenSeaBanner";
import BoxersList from "../../components/page-components/market-page/BoxersList/BoxersList";
import SocialTradeBanner from "../../components/page-components/market-page/SocialsTradeBanner/SocialTradeBanner";

const Market = () => {
  return (
    <div className="global-market-page">
      <OpenSeaBanner />
      <BoxersList />
      <SocialTradeBanner />
    </div>
  );
};

export default Market;
