import React from "react";
import styled from "styled-components";
import {
  FaDollarSign,
  FaShieldAlt,
  FaBatteryHalf,
  FaWifi,
} from "react-icons/fa"; // Importing icons

const BenefitCardsSection = () => {
  const benefits = [
    {
      title: "Low Cost",
      description: "Efficient use of resources with reduced expenses.",
      icon: <FaDollarSign />,
    },
    {
      title: "Security",
      description: "Enhanced safety measures to protect campus assets.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Low Power",
      description: "Energy-efficient systems to minimize power consumption.",
      icon: <FaBatteryHalf />,
    },
    {
      title: "Long Range",
      description: "Reliable connectivity over long distances.",
      icon: <FaWifi />,
    },
  ];

  return (
    <Section>
      <Title>Smart Campus Benefits</Title>
      <Cards>
        {benefits.map((benefit, index) => (
          <Card key={index}>
            <Icon>{benefit.icon}</Icon>
            <CardTitle>{benefit.title}</CardTitle>
            <CardDescription>{benefit.description}</CardDescription>
          </Card>
        ))}
      </Cards>
    </Section>
  );
};

export default BenefitCardsSection;

const Section = styled.div`
  text-align: center;
  padding: 50px;
`;

const Title = styled.h2`
  font-size: 2.6rem;
  margin-bottom: 35px;
`;

const Cards = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 700px) {
    width: 80%; /* Adjust width for mobile */
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 1rem;
`;
