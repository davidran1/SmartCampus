import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  margin-top: 60px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #1f2937;
  }

  label {
    color: #1f2937;
    font-size: 1rem;
    margin-bottom: 5px;
  }

  input,
  select {
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    padding: 10px;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #2f80ed;
      box-shadow: 0 0 0 2px rgba(47, 128, 237, 0.2);
    }
  }
`;

export const EmailInputContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const EmailUsernameInput = styled.input`
  flex: 1;
  border-radius: 4px 0 0 4px;
  border-right: none;
`;

export const EmailDomainSelect = styled.select`
  width: 140px;
  border-radius: 0 4px 4px 0;
  border-left: none;
  background-color: #e5e7eb;
`;

export const PhoneInputContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const PhonePrefixSelect = styled.select`
  width: 80px;
  border-radius: 4px 0 0 4px;
  border-right: none;
  background-color: #e5e7eb;
`;

export const PhoneNumberInput = styled.input`
  flex: 1;
  border-radius: 0 4px 4px 0;
  border-left: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  flex: 1;
  background: #2f80ed;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #1e3a8a;
  }
`;

export const SubmitButton = styled(Button)`
  background: #2f80ed;
`;

export const ClearButton = styled(Button)`
  background: #9ca3af;

  &:hover {
    background: #6b7280;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export const SignInLink = styled.a`
  color: #2f80ed;
  font-size: 0.9rem;
  text-decoration: none;
  text-align: center;
  margin-top: 15px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
