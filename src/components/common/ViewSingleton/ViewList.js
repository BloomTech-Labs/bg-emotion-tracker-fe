import React from 'react';
import ViewCollapse from './ViewCollapse';
import { List } from 'antd';
import { propTypes } from 'qrcode.react';

const data = [
  {
    id: '121e21ex12',
    Name: 'Dungeons and Dragons',
    Role: '',
    Desc: 'Members get together to play the tabletop game D&D',
    Location: 'adsndjasn12', // Id of club,
  },
  {
    id: '121e21ex12',
    Name: 'Dungeons and Dragons',
    Role: '',
    Desc: 'Members get together to play the tabletop game D&D',
    Location: 'adsndjasn12', // Id of club,
  },
];
function ViewList(props) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta title={item.Name} />
        </List.Item>
      )}
    />
  );
}

export default ViewList;
