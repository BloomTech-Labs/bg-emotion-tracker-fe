import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import { AdminContext } from '../../state/contexts/';

export default function Tabs(props) {
  const context = useContext(AdminContext);

  Tabs.propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const onClickTabItem = tab => {
    setActiveTab(tab);
  };

  function combine_badges(arr) {
    const rtn = {};

    arr.forEach(alert => {
      if (!(alert.clubname in rtn)) {
        rtn[alert.clubname] = 0;
      }
      rtn[alert.clubname] += 1;
    });
    return rtn;
  }

  let badgeObj = combine_badges(context.memberReactions);

  return (
    <div className="tabs">
      <ol className="tab-list">
        {props.children.map(child => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
              count={badgeObj[label]}
            />
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
