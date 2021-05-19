import PropTypes from 'prop-types';
import React from 'react';

function LayoutContainer(props) {
  const { children } = props;

  return <div className="layout">{children}</div>;
}

export default LayoutContainer;
