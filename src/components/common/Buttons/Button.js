import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';

const StyledLink = styled(Link)`
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  text-align: center;
  margin: 20px auto;
`;

export const StyledBtn = ({ path, onClick, label }) => {
  return (
    <StyledButton size="large" type="primary" onClick={onClick}>
      <StyledLink to={path}>{label}</StyledLink>
    </StyledButton>
  );
};
