import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <Container>
        <Separator />
        <br />
        <br />

        <Quote>
          An innovative approach to optimal resource use and maximal comfort.
        </Quote>
        <br />
        <br />
        <Link href="https://www.hit.ac.il/">HIT College Site</Link>
        <p>&copy; 2023 Smart Campus Project</p>
      </Container>
    </>
  );
};

export default Footer;

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  margin-top: 64px;
  width: 100%;
`;

const Quote = styled.p`
  font-size: 30px;
  text-align: center;
  margin-bottom: 24px;
`;

const Separator = styled.div`
  height: 1px;
  width: 100%;
  background-color: #cccccc;
`;

const Link = styled.a`
  font-size: 16px;
  color: #000000;
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
  }
`;
