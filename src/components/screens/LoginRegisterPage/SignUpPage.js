import React, { useState, useEffect } from "react";
import { useRegisterUserMutation } from "../../../redux/rtk/userData";
import {
  Container,
  SignUpForm,
  EmailInputContainer,
  EmailUsernameInput,
  EmailDomainSelect,
  PhoneInputContainer,
  PhonePrefixSelect,
  PhoneNumberInput,
  ButtonContainer,
  SubmitButton,
  ClearButton,
  SignInLink,
  ErrorMessage,
} from "./SignUpPageStyles";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import SuccessScreen from "../SuccessScreen";
import FailureScreen from "../FailureScreen";

const SignUpPage = () => {
  const emailDomains = [
    "@gmail.com",
    "@walla.co.il",
    "@outlook.com",
    "@yahoo.com",
  ];
  const phonePrefixes = ["050", "052", "053", "054", "055", "058"];

  //SignUp form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailUsername, setEmailUsername] = useState("");
  const [emailDomain, setEmailDomain] = useState("@gmail.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("050");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();

  const handleClick = () => {
    navigate("/login");
  };

  //Validations
  const validateForm = () => {
    const newErrors = {};

    // Validate first name and last name (letters only)
    if (!/^[a-zA-Z\s]*$/.test(firstName)) {
      newErrors.firstName = "First name must include letters only";
    }
    if (!/^[a-zA-Z\s]*$/.test(lastName)) {
      newErrors.lastName = "Last name must include letters only";
    }

    // Validate password
    const passwordErrors = [];

    if (password.length === 0) {
      passwordErrors.push("Password is required");
    }

    if (password.length < 8) {
      passwordErrors.push("Password must be at least 8 characters long");
    }

    if (password.length > 20) {
      passwordErrors.push("Password must be at most 20 characters long");
    }

    if (!/[a-z]/.test(password)) {
      passwordErrors.push(
        "Password must contain at least one lowercase letter"
      );
    }

    if (!/[A-Z]/.test(password)) {
      passwordErrors.push(
        "Password must contain at least one uppercase letter"
      );
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      passwordErrors.push("Password must contain at least one symbol");
    }

    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join(". ");
    }

    // Validate ID
    if (!/^\d{9}$/.test(id)) {
      newErrors.id = "Invalid id";
    }

    // Validate phone number (exactly 7 digits)
    if (!/^\d{7}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords should be equals";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Backend may return some errors , print these errors to client seperatly
  const getCleanErrorMessage = (error) => {
    if (!error?.data?.driverError?.detail) {
      return "An unexpected error occurred";
    }
    setIsFailure(false);
    setErrorMessage("");
    const errorDetail = error.data.driverError.detail;
    console.log({ errorDetail });

    // Multiple errors handling
    const errors = [];
    if (errorDetail.includes("email")) errors.push("Mail already exists");
    if (errorDetail.includes("userId")) errors.push("ID already exists");
    if (errorDetail.includes("userName")) errors.push("UserName alrady exists");

    return errors.length > 0 ? errors.join(", ") : "Registration error";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const email = emailUsername + emailDomain;
      const phone = phonePrefix + phoneNumber;
      setIsLoading(true);
      try {
        const newUser = {
          userName,
          password,
          firstName,
          lastName,
          phone,
          userId: id,
          email,
        }; // Registering new user to database
        const result = await registerUser(newUser);
        if (typeof result.data === "string") {
          console.log("Registration message:", result.data);
          setIsSuccess(true);
        } else if (result.error) {
          const errorDetail = getCleanErrorMessage(result.error);
          setErrorMessage(errorDetail);
          setIsFailure(true);
        }
      } catch (error) {
        console.error(`Error registering user ${id}: ${error.message}`);
        setErrorMessage(error.message);
        setIsFailure(true);
      }
    }
  };

  const userEmail = emailUsername + emailDomain;
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/validateToken", { state: { email: userEmail } });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate, userEmail]);

  //Clear button
  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmailUsername("");
    setEmailDomain("@gmail.com");
    setPassword("");
    setConfirmPassword("");
    setId("");
    setPhonePrefix("050");
    setPhoneNumber("");
    setErrors({});
  };
  const onErrorClose = () => {
    setIsFailure(false);
    setIsLoading(false);
    setErrorMessage("");
  };

  return (
    <Container>
      <SignUpForm onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}

        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <EmailInputContainer>
          <EmailUsernameInput
            type="text"
            id="emailUsername"
            value={emailUsername}
            onChange={(e) => setEmailUsername(e.target.value)}
            required
            placeholder="mail"
          />
          <EmailDomainSelect
            id="emailDomain"
            value={emailDomain}
            onChange={(e) => setEmailDomain(e.target.value)}
          >
            {emailDomains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </EmailDomainSelect>
        </EmailInputContainer>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}

        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}

        <label htmlFor="phone">Phone:</label>
        <PhoneInputContainer>
          <PhonePrefixSelect
            id="phonePrefix"
            value={phonePrefix}
            onChange={(e) => setPhonePrefix(e.target.value)}
          >
            {phonePrefixes.map((prefix) => (
              <option key={prefix} value={prefix}>
                {prefix}
              </option>
            ))}
          </PhonePrefixSelect>
          <PhoneNumberInput
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="phone number"
          />
        </PhoneInputContainer>
        {errors.phoneNumber && (
          <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
        )}

        <ButtonContainer>
          <SubmitButton type="submit" disabled={isLoading}>
            Create Account
          </SubmitButton>
          <ClearButton type="button" onClick={handleClear} disabled={isLoading}>
            Clear
          </ClearButton>
        </ButtonContainer>
        <SignInLink onClick={handleClick}>
          Already have an account? Sign In
        </SignInLink>
      </SignUpForm>
      {isLoading && <LoadingScreen message="Registering..." />}
      {isSuccess && (
        <SuccessScreen
          mainMessage="Registration Successful!"
          message="Redirecting to token verification..."
        />
      )}
      {isFailure && (
        <FailureScreen
          mainMessage="Registration Failed!"
          bodyMessage={errorMessage}
          onClose={onErrorClose}
        />
      )}
    </Container>
  );
};

export default SignUpPage;
