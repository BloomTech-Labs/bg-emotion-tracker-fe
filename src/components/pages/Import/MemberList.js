import React from 'react';
import { List } from 'antd';

const MemberList = ({ inputData }) => {
  let source = [];

  //Push all data to source
  inputData.file.forEach(item => {
    source.push(item);
  });
  inputData.individual.forEach(item => {
    source.push(item);
  });
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={source}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta title={item} />
        </List.Item>
      )}
    />
  );
};

export default MemberList;
