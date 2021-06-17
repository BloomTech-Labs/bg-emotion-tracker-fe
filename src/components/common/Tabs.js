import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import { AdminContext } from '../../state/contexts';
import { Badge } from 'antd';

export default function Tabs(props) {
  const context = useContext(AdminContext);
  const { showBadge } = props;

  Tabs.propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const onClickTabItem = tab => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {props.children.map(child => {
          const { label } = child.props;

          return (
            <div>
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            </div>
          );
        })}
      </ol>
      <div className="tab-content">
        {props.children.map(child => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}
