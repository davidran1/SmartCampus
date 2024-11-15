import React, { useState } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // send email
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_USER_ID")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );
    setSuccessMessage("Thank you for submitting the form!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ContactUsWrapper>
      <ContactDetailsWrapper>
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h2>
        <p>
          If you're interested in joining the Smart Campus project or have any
          questions, please don't hesitate to contact us using the form below or
          through the following channels:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@smartcampushit.com">info@smartcampushit.com</a>
          </li>
          <li>
            <strong>Phone:</strong> +1 (555) 123-4567
          </li>
        </ul>
      </ContactDetailsWrapper>
      <ContactFormWrapper>
        <motion.form
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
          >
            Submit
          </motion.button>
        </motion.form>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </ContactFormWrapper>
    </ContactUsWrapper>
  );
};

export default ContactUs;

const ContactUsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ContactDetailsWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  text-align: center;
  @media (min-width: 768px) {
    margin-bottom: 0;
    text-align: left;
  }
  h2 {
    color: #1f2937;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  p {
    color: #4b5563;
    font-size: 1.2rem;
    margin-bottom: 20px;
    line-height: 1.5;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      color: #4b5563;
      font-size: 1.2rem;
      margin-bottom: 10px;
      strong {
        color: #1f2937;
      }
      a {
        color: #2f80ed;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const ContactFormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  @media (min-width: 768px) {
    margin-left: 50px;
  }
  form {
    display: flex;
    flex-direction: column;
    label {
      color: #1f2937;
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
    input,
    textarea {
      background: #f3f4f6;
      border: none;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 20px;
      &:focus {
        outline: none;
        border-color: #2f80ed;
        box-shadow: 0 0 2px 2px #9ae6b4;
      }
    }
    textarea {
      resize: vertical;
      min-height: 150px;
    }
    button {
      background: #2f80ed;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: #1e3a8a;
      }
    }
  }
`;

const SuccessMessage = styled.p`
  color: #4b5563;
  font-size: 1.2rem;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
`;
