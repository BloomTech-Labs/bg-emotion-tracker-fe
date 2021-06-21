import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-active';
    }

    return (
      <li className={className} onClick={onClick}>
        {label}
        <Badge count={this.props.count} className="badge" />
      </li>
    );
  }
}

export default Tab;
