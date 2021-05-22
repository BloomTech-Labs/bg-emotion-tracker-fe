import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const layout = {
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 1,
  },
};

export const AddIndividual = props => {
  const { inputData, setInputData } = props;
  const [currentIndividual, setCurrentIndividual] = useState({
    programName: '',
    club: {},
  });

  useEffect(() => {
    if (currentIndividual.programName) {
      pushData();
    }
  }, [currentIndividual]);

  const onFinish = values => {
    setCurrentIndividual({
      ...currentIndividual,
      programName: values.programName,
    });
  };

  const pushData = () => {
    const newList = inputData.individual;
    newList.push(currentIndividual);
    setInputData({
      ...inputData,
      individual: newList,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const selectClub = (e, item) => {
    setCurrentIndividual({
      ...currentIndividual,
      club: item,
    });
    console.log(currentIndividual);
  };

  const menu = (
    <Menu>
      {props.clubsContext.clubs.map(item => (
        <Menu.Item key={item.clubid} onClick={e => selectClub(e, item)}>
          {item.clubname}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Form
      {...layout}
      name="addIndividual"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Program Name"
        name="programName"
        rules={[{ required: true, message: 'Please enter a valid name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Club Name"
        name="clubName"
        rules={[{ required: false, message: 'Please enter a valid club name' }]}
      >
        <Dropdown overlay={menu}>
          <Button>
            Select Club <DownOutlined />
          </Button>
        </Dropdown>
        {` Selected Club: ${
          currentIndividual.club.clubname
            ? currentIndividual.club.clubname
            : 'none'
        }`}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddIndividual;
