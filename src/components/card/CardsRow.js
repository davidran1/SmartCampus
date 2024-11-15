import React from "react";
import styled from "styled-components";
import {
  FaBolt,
  FaTemperatureLow,
  FaTint,
  FaRecycle,
  FaTree,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion

const CardsRow = () => {
  const navigate = useNavigate();

  const handleLearnMore = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <MotionCard
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <IconContainer>
          <FaBolt size={64} color="#007FFF" />
        </IconContainer>
        <TextArea>Optimizing Power Consumption</TextArea>
        <CardFooterButton onClick={() => handleLearnMore("Power")}>
          Learn More!
        </CardFooterButton>
      </MotionCard>

      <MotionCard
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <IconContainer>
          <FaTemperatureLow size={64} color="#007FFF" />
        </IconContainer>
        <TextArea>Microclimate and Air Quality Monitoring</TextArea>
        <CardFooterButton onClick={() => handleLearnMore("Air")}>
          Learn More!
        </CardFooterButton>
      </MotionCard>

      <MotionCard
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <IconContainer>
          <FaTint size={64} color="#007FFF" />
        </IconContainer>
        <TextArea>Optimizing Water Consumption</TextArea>
        <CardFooterButton onClick={() => handleLearnMore("Water")}>
          Learn More!
        </CardFooterButton>
      </MotionCard>

      <MotionCard
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <IconContainer>
          <FaRecycle size={64} color="#007FFF" />
        </IconContainer>
        <TextArea>The Recycling and Garbage Efficiency</TextArea>
        <CardFooterButton
          onClick={() => handleLearnMore("RecyclingGarbageEfficiency")}
        >
          Learn More!
        </CardFooterButton>
      </MotionCard>

      <MotionCard
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <IconContainer>
          <FaTree size={64} color="#007FFF" />
        </IconContainer>
        <TextArea>Micro-climatic Eco-Human Space</TextArea>
        <CardFooterButton onClick={() => handleLearnMore("MicroClimatic")}>
          Learn More!
        </CardFooterButton>
      </MotionCard>

      <MotionCard
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <IconContainer>
          <FaTrash size={64} color="#007FFF" />
        </IconContainer>
        <TextArea>Increasing campus cleanliness</TextArea>
        <CardFooterButton onClick={() => handleLearnMore("Cleanliness")}>
          Learn More!
        </CardFooterButton>
      </MotionCard>
    </Container>
  );
};

export default CardsRow;

// Convert Card into motion.div for animation
const MotionCard = motion(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 12px;
  width: 15rem;
  height: 300px;
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
`);

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 100%;
  justify-content: center;
  padding: 0px 20px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: nowrap;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;

const TextArea = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  white-space: pre-wrap;
`;

const CardFooterButton = styled.button`
  margin: 22px 12px;
  padding: 8px;
  background-color: #007fff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
