import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const StyledButton = styled(Button)`
  background-color: 293845;
  width: auto;
  text-align: center;
  justify-content: center;
  align-content: center;
  margin-top: 2rem;
  margin-left: 1.5rem;
`;

const BackButton = props => {
  // notice we don't pass a click handler to this component. It's supposed to be used as a FormButton only.
  // You'd want to use an onSubmit on the Form Element itself to keep your forms organized.
  return (
    <StyledButton size="large" type={props.classType}>
      <ArrowLeftOutlined /> {props.buttonText}
    </StyledButton>
  );
};

export default BackButton;

BackButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classType: PropTypes.string,
};
