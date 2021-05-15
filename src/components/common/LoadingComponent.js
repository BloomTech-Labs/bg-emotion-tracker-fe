import PropTypes from 'prop-types';
import React from 'react';
import { Spin } from 'antd';

function LoadingComponent(props) {
  const { message } = props;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin
        class="loading-spinner"
        tip={message}
        size="large"
        style={{ margin: '0 auto', fontWeight: '600' }}
      />
    </div>
  );
}

export default LoadingComponent;

LoadingComponent.propTypes = {
  message: PropTypes.string.isRequired,
};
