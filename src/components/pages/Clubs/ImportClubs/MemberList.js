import React from 'react';
import { List } from 'antd';

const MemberList = ({ inputData }) => {
  let source = [];

  //Push all input data to source
  inputData.individual.forEach(item => {
    source.push(item);
  });
  inputData.file.forEach(item => {
    source.push(item);
  });
  /*
    
    */
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 20,
      }}
      size="small"
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
