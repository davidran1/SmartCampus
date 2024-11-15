import React, { useEffect } from "react";
//import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

export const TypeDashboard = ({ type }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (type) {
      navigate(`/${type}Dashboard`);
    }
  }, [type, navigate]);

  return (
    <>
      <div>
        <h2>Dashboard Classification</h2>
        <p>{type ? `Classification Found` : `Classification Unknown`}</p>
      </div>
    </>
  );
};
