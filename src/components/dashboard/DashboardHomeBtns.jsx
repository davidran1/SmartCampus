import React, { useState } from "react";
import styled from "styled-components";
import { TypeDashboard } from "./TypeDashboard";

// New Component for Dashboard Classification
const DashboardClassification = ({ source }) => {
  const handleUnknownSourceClick = () => {
    console.log(`Clicked from an unknown source: ${source}`);
  };
  return <TypeDashboard type={source} />;
};

const DashboardHomeBtns = ({ source }) => {
  const [showDashboard, setShowDashboard] = useState(false);
  const isMobile = window.innerWidth < 700; // Check if viewport width is less than 700px

  const handleDashboardClick = () => {
    setShowDashboard(true); // Show the Dashboard Classification component
  };

  if (showDashboard) {
    return <DashboardClassification source={source} />;
  }

  return (
    <>
      <BtnContainer>
        <DashBtn onClick={() => handleDashboardClick()}>
          {isMobile ? "Dashboard" : "Show Dashboard"}
        </DashBtn>
        <HomeBtn onClick={() => (window.location.href = "/")}>
          {isMobile ? "Main" : "Back to Main Page"}
        </HomeBtn>
      </BtnContainer>
    </>
  );
};

export default DashboardHomeBtns;

const HomeBtn = styled.button`
  appearance: button;
  background-color: rgb(24, 153, 214);
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  border-radius: 16px;
  border-width: 0px 0px 4px;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  font-family: din-round, sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.8px;
  line-height: 20px;
  margin: 0px;
  outline: none;
  overflow: visible;
  padding: 13px 16px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0px);
  transition: filter 0.2s ease 0s;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 13rem;
  text-decoration: none;
  margin-top: 50px;
  align-self: center;

  &:after {
    background-clip: padding-box;
    background-color: #1cb0f6;
    border: solid transparent;
    border-radius: 16px;
    border-width: 0 0 4px;
    bottom: -4px;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.1);
    -webkit-filter: brightness(1.1);
  }

  &:disabled {
    cursor: auto;
  }

  &:active {
    border-width: 4px 0 0;
    background: none;
  }

  @media (max-width: 700px) {
    width: 150px;
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DashBtn = styled.button`
  appearance: button;
  background-color: rgb(24, 153, 214);
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  border-radius: 16px;
  border-width: 0px 0px 4px;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  font-family: din-round, sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.8px;
  line-height: 20px;
  margin: 0px;
  outline: none;
  overflow: visible;
  padding: 13px 16px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0px);
  transition: filter 0.2s ease 0s;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 13rem;
  text-decoration: none;
  margin-top: 50px;
  align-self: center;

  &:after {
    background-clip: padding-box;
    background-color: #1cb0f6;
    border: solid transparent;
    border-radius: 16px;
    border-width: 0 0 4px;
    bottom: -4px;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.1);
    -webkit-filter: brightness(1.1);
  }

  &:disabled {
    cursor: auto;
  }

  &:active {
    border-width: 4px 0 0;
    background: none;
  }
  @media (max-width: 700px) {
    width: 150px;
  }
`;
