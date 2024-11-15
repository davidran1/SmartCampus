import React, { useEffect } from "react";
import styled from "styled-components";
import DashboardHomeBtns from "../../dashboard/DashboardHomeBtns";

const LearnMorePage = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Content>
        <h1
          style={{
            marginBottom: "5px", // Space below the headline
            padding: "75px 1px",
            fontWeight: "bold",
            fontSize: "42px",
            background: "linear-gradient(90deg, #3f51b5, #21CBF3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          Development and Implementation of a "smart" Microclimatic Place
        </h1>
        <Text>
          This refers to creating advanced ergonomic spaces that optimize
          environmental conditions, like temperature and lighting, for joint
          work or study. Combining natural elements such as vegetation with
          sustainable construction practices, this space would enhance comfort
          while promoting sustainability. The design would likely integrate
          energy-efficient materials and advanced technologies to balance the
          climate naturally, creating a healthier and more productive
          environment for campus occupants.
        </Text>
        <DashboardHomeBtns source="microClimatic" />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 36px;
  margin: 10px 0px;
`;

const Text = styled.p`
  font-size: 20px;
  line-height: 1.5;
  text-align: justify;
  margin-top: 10px; // Added margin to increase space above the text
  font-weight: 500; // Added this line to make the text bold
`;

export default LearnMorePage;
