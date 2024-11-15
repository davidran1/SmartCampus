import React from "react";
import "../Style.css";
import CardsRow from "./card/CardsRow";
import InfoSection from "./InfoSection";
import InfoCompanySection from "./InfoCompanySection";
import BenefitCardsSection from "./BenefitCardsSection";

const MainBody = () => {
  return (
    <>
      <InfoSection />
      <br />
      <BenefitCardsSection />
      <br />
      <InfoCompanySection />
      <br />
      <br />
      <br />
      <CardsRow />
      <br />
    </>
  );
};

export default MainBody;
