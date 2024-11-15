import React, { useState } from "react";
import styled from "styled-components";
import { useLoginUserMutation } from "../../../redux/rtk/userData";
import { useDispatch } from "react-redux";
import {
  setToken,
  setUserName,
  setRole,
} from "../../../redux/slices/userDataSlice";
import { useNavigate } from "react-router-dom";
import FailureScreen from "../FailureScreen";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFailure, setIsFailure] = useState(false);

  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sign-up");
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Getting user from database
      const result = await loginUser({ userName: username, password });

      console.log("Login successful, token:", result.data.token);
      console.log("Login successful, role:", result.data.roleId);
      // Save user token and userName
      dispatch(setToken(result.data.token));
      dispatch(setUserName(username));
      dispatch(setRole(result.data.roleId));

      //Succsesfully login , navigate to home page
      if (result) {
        navigate("/");
      }
    } catch (error) {
      //If failed , the failure screen will show up
      setIsFailure(true);
    }
  };

  const onErrorClose = () => {
    setIsFailure(false);
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
        <SignUpLink onClick={handleClick}>
          Not registered yet? Sign Up
        </SignUpLink>
        {isFailure && (
          <FailureScreen
            mainMessage="Sign in Failed!"
            bodyMessage="UserName or Password are incorrect"
            onClose={onErrorClose}
          />
        )}
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  margin-top:40px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.2);
  h1{
    text-align:center;
    margin-bottom:20px;
  }
  form {
    display: flex;
    flex-direction: column;
    label {
      color: #1F2937;
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
    input, textarea {
      background: #F3F4F6;
      border: none;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 20px;
      &:focus {
        outline: none;
        border-color: #2F80ED;
        box-shadow: 0 0 2px 2px #9AE6B4;
      }
    }
    button {
      background: #2F80ED;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: #1E3A8A;
      }
    }
`;

const SignUpLink = styled.a`
  color: #2f80ed;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default LoginPage;
