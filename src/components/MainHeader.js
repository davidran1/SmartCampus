import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaBars } from "react-icons/fa";
import "../Style.css"; // Ensure this file doesn't conflict with the styled-components
import logoImage from "../HIT.png";
import { useNavigate } from "react-router-dom";
import SuccessScreen from "./screens/SuccessScreen";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userDataSlice";

const MainHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Retrieve user data from local storage
  const role = useSelector((state) => state.userData.role); // 0 is admin

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMapClick = (e, mapDivId) => {
    e.preventDefault();
    sessionStorage.setItem("mapDivId", mapDivId);
    window.location.href = "/";
  };

  const handleLogoAndTitleClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    dispatch(logout()); // Clears the Redux state
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      navigate("/");
    }, 2000);
  };

  const menuItems = [
    { name: role === 0 ? "Admin panel" : "", path: "/admin" },
    { name: "Staff", path: "/staff" },
    { name: "Students", path: "/students" },
    { name: "Partners", path: "/partners" },
    { name: "Contact Us", path: "/contact" },
    { name: "News", path: "/news" },
    {
      name: "HIT 3D Map",
      path: "/",
      onClick: (e) => handleMapClick(e, "hitMap"),
    },
    role !== ""
      ? { name: "Logout", path: "/logout", onClick: handleLogout }
      : { name: "Login", path: "/login" },
  ];

  return (
    <>
      <Container>
        <CustomNavBar>
          <LogoAndTitle onClick={handleLogoAndTitleClick}>
            <Logo src={logoImage} alt="Smart Campus Logo" />
            <Title>Smart Campus</Title>
          </LogoAndTitle>
          <MenuIcon onClick={handleMenuClick}>
            <FaBars />
          </MenuIcon>
          <MenuLinks show={showMenu}>
            <ul>
              {menuItems.map((item) => (
                <MenuItem key={item.name}>
                  <a
                    onClick={(e) => {
                      if (item.onClick) {
                        item.onClick(e);
                      } else {
                        navigate(item.path);
                      }
                      setShowMenu(false);
                    }}
                  >
                    {item.name}
                  </a>
                </MenuItem>
              ))}
            </ul>
          </MenuLinks>
        </CustomNavBar>
      </Container>
      {isSuccess && (
        <SuccessScreen
          mainMessage="Logged out successfully!"
          message="Redirecting to home page..."
        />
      )}
    </>
  );
};

export default MainHeader;

const bounceAnimation = keyframes`
  16.65% {
    transform: translateY(8px);
  }
  33.3% {
    transform: translateY(-6px);
  }
  49.95% {
    transform: translateY(4px);
  }
  66.6% {
    transform: translateY(-2px);
  }
  83.25% {
    transform: translateY(1px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Container = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(48 48 48);
  padding: 5px 20px;
  border-bottom: 1px solid #dddddd;
  position: sticky;
  top: 0px;
  z-index: 1;
  text-align: center;
  color: white;

  h1 {
    font-family: "Montserrat", sans-serif;
    font-size: 24px;
    color: white; /* White text color */
  }
`;

const CustomNavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-transform: uppercase;

  @media screen and (max-width: 1130px) {
    flex-direction: column;
  }
`;

const LogoAndTitle = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none; /* Ensure the link has no underline */
  cursor: pointer;

  @media screen and (max-width: 1130px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 60px; /* Adjust the size as needed */
  height: auto;
  margin-bottom: 5px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  color: white; /* White text color */
  margin-left: 10px;
  margin: 0; /* Reset margin to ensure alignment with Logo */

  @media screen and (max-width: 1130px) {
    display: none;
  }
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;

  @media screen and (max-width: 1130px) {
    display: block;
    font-size: 24px;
  }
`;

const MenuLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    list-style: none;
    display: flex; /* Default to flex for desktop */
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  li {
    margin-left: 2em; /* Match the left and right margins */
    margin-right: 2em;
  }

  a {
    color: white; /* White text color */
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    transition: color 0.5s ease-in-out;
  }

  @media screen and (max-width: 1130px) {
    ul {
      display: ${({ show }) =>
        show ? "flex" : "none"}; /* Show menu items when show is true */
      flex-direction: column; /* Stack items vertically */
      width: 100%; /* Full width for mobile */
      padding: 20px 0; /* Add padding for spacing */
      background-color: rgb(48, 48, 48); /* Background color */
    }

    li {
      margin: 10px 0; /* Margin for spacing between items */
    }
  }
`;
const hoverableStyles = css`
  display: inline-block;
  backface-visibility: hidden;
  vertical-align: middle;
  position: relative;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  transform: translateZ(0);
  transition-duration: 0.3s;
  transition-property: transform;
  cursor: pointer;

  &:before {
    position: absolute;
    pointer-events: none;
    z-index: -1;
    content: "";
    top: 100%;
    left: 5%;
    height: 10px;
    width: 90%;
    opacity: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.35) 0%,
      rgba(255, 255, 255, 0) 80%
    );
    transition-duration: 0.3s;
    transition-property: transform, opacity;
  }

  &:hover,
  &:active,
  &:focus {
    transform: translateY(-5px);

    &:before {
      opacity: 1;
    }
  }
`;

const MenuItem = styled.li`
  ${hoverableStyles}
`;
