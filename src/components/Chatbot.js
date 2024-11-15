import React, { useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import { SiChatbot } from "react-icons/si";
import { useEffect } from "react";

const Chatbot = ({ src, title, width, height, loading, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const botSrc =
    "https://web.powerva.microsoft.com/environments/Default-3c678821-7750-47a3-937f-2661439abb7a/bots/cr971_smartCampuscLOm6B/webchat?__version__=2";

  const chatWidth = 380;
  const chatHeight = 630;
  const buttonSize = 80;

  useEffect(() => {
    const updateBounds = () => {
      setBounds({
        top: -document.documentElement.clientHeight + chatHeight,
        left: -document.documentElement.clientWidth + chatWidth,
        right: 30,
        bottom: 30,
      });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [buttonSize]);

  const toggleVisibility = () => {
    if (!isDragging) {
      setIsVisible(!isVisible);
      setShowBubble(false);
    }
  };

  const handleStart = () => {
    setIsDragging(false);
  };

  const handleDrag = () => {
    setIsDragging(true);
  };

  const closeBubble = () => {
    setShowBubble(false);
  };

  return (
    <Draggable
      onStart={handleStart}
      onDrag={handleDrag}
      bounds={{
        top: bounds.top,
        left: bounds.left,
        right: bounds.right,
        bottom: bounds.bottom,
      }}
    >
      <ChatbotContainer>
        {showBubble && (
          <ChatBubble>
            <BubbleText>
              Hello and welcome to Smart Campus!
              <br />
              I'm your virtual assistant.
            </BubbleText>
            <CloseBubbleButton onClick={closeBubble}>×</CloseBubbleButton>
          </ChatBubble>
        )}
        <ToggleButton onClick={toggleVisibility}>
          <SiChatbot size={22} />
        </ToggleButton>

        {isVisible && (
          <ChatbotDiv>
            <iframe
              src={botSrc}
              title={title}
              width={width}
              height={height}
              loading={loading}
              {...props}
            />
          </ChatbotDiv>
        )}
      </ChatbotContainer>
    </Draggable>
  );
};

export default Chatbot;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: #007bff;
  border: none;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s;
  z-index: 1000;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChatbotDiv = styled.div`
  position: fixed;
  bottom: 7rem;
  right: 1rem;
  width: 350px;
  height: 500px;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.3); /* 70% transparent white */
  overflow: hidden;
`;
const ChatBubble = styled.div`
  position: absolute;
  bottom: 7rem;
  right: 1rem;
  padding: 0.5rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 330px;
  z-index: 1001;
`;

const BubbleText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const CloseBubbleButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  margin-left: 1rem;
  font-weight: bold;
`;
