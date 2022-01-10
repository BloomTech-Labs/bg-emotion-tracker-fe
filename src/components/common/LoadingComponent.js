import PropTypes from 'prop-types';
import React from 'react';
import { Spin } from 'antd';

function LoadingComponent(props) {
  const { message } = props;

  return (
    <Spin
      className="loading-spinner"
      tip={message}
      size="large"
      style={{ margin: '0 auto', fontWeight: '800' }}
    />
  );
}

export default LoadingComponent;

LoadingComponent.propTypes = {
  message: PropTypes.string.isRequired,
};
