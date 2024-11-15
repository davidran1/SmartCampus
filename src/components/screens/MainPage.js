import React, { useEffect } from "react";
import "../../Style.css";
import styled from "styled-components";
import MainBody from "../MainBody";
import IFrameTemplate from "../IFrameTemplate";

const MainPage = () => {
  const MapSrc = "https://shaishillo.github.io/Campus-Nav/";

  useEffect(() => {
    const mapDivId = sessionStorage.getItem("mapDivId");
    if (mapDivId) {
      const mapDiv = document.getElementById(mapDivId);
      if (mapDiv) {
        mapDiv.scrollIntoView({ behavior: "smooth" });
        // Adjust the scroll position slightly after scrolling into view
        setTimeout(() => {
          window.scrollBy(0, 110); // Adjust 110 to the amount of pixels you want to scroll up
        }, 500); // Timeout to ensure it runs after scrollIntoView
      }
      sessionStorage.removeItem("mapDivId");
    }
  }, []);
  return (
    <MainContainer>
      <MainBody />
      <h2>GIS Mapping of Hit College</h2>
      <IFrameTemplate
        id="hitMap"
        title="Mapping of Hit College"
        src={MapSrc}
        width="90%"
        height="550vh"
        loading="lazy"
      />
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  text-align: center;
`;

const Separator = styled.div`
  margin-top: 50px;
  text-align: center;
`;
