import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const StyledLink = styled(Link)`
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  text-align: center;
  margin: 20px auto;
`;

export const StyledBtn = ({ path, onClick, label, isDisabled }) => {
  return (
    <StyledButton
      size="large"
      type="primary"
      onClick={onClick}
      disabled={isDisabled}
    >
      <StyledLink to={path}>{label}</StyledLink>
    </StyledButton>
  );
};

Button.propTypes = {
  disabled: PropTypes.string,
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
