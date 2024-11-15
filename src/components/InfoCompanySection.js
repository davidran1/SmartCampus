import React, { useState } from "react";
import styled from "styled-components";

// Import images from the assets folder
import image1 from "../assets/Banner.png";
import image2 from "../assets/mgm_elements.jpg";

// List of images and associated text content
const images = [image1, image2];
const textContent = [
  "",
  "At MGM Group, we develop and integrate smart city projects with sensors that measure physical parameters such as humidity levels or electricity fluctuations and provide top-notch software that ensures an easy and intuitive interface to simplify the decision-making process. The Artificial Intelligence module of the software provides additional capabilities for security and optimization.",
];

const InfoCompanySection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle "next" button click
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle "previous" button click
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to handle image click
  const handleImageClick = () => {
    handleNext(); // Change to the next image on click
  };

  return (
    <InfoCompanySectionContainer>
      <ImageContainer
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        onClick={handleImageClick} // Add click handler to the image container
      />
      <LeftButton onClick={handlePrev}>&#8249;</LeftButton>
      <RightButton onClick={handleNext}>&#8250;</RightButton>
      <OverlayText currentImageIndex={currentImageIndex}>
        {currentImageIndex === 1 && <Title>MGM</Title>}
        {textContent[currentImageIndex]}
      </OverlayText>
    </InfoCompanySectionContainer>
  );
};

export default InfoCompanySection;

// Styled Components

const InfoCompanySectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 90vh; /* Adjust height of the container */
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%; /* Set the width of the image container to 90% of the parent container */
  height: 100%; /* Set the height of the image container to 100% of the parent container */
  transform: translate(-50%, -50%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer; /* Change cursor to pointer on hover */
`;

const InfoCompanySectionButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const LeftButton = styled(InfoCompanySectionButton)`
  left: 10px;
`;

const RightButton = styled(InfoCompanySectionButton)`
  right: 10px;
`;

const OverlayText = styled.div`
  position: absolute;
  top: 10%;
  left: 10%; /* Position text on the left */
  color: ${(props) =>
    props.currentImageIndex === 0
      ? "black"
      : "white"}; /* Black text for the first image, white text for the second image */
  font-size: 20px;
  font-weight: 500;
  font-family: "Gill Sans", sans-serif;
  text-align: left;
  background-color: rgba(0, 0, 0, 0);
  padding: 40px;
  border-radius: 8px; /* Rounded corners for aesthetics */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4); /* Light text shadow for better readability */
  max-width: 40%; /* Limit the width of the text box */
`;

const Title = styled.h2`
  color: white;
  font-size: 50px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px; /* Space between title and text */
`;
