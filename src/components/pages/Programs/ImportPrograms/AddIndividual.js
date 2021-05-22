import React, { useState } from 'react';
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
    clubName: '',
  });

  const onFinish = values => {
    console.log(values.programName);
    setCurrentIndividual({
      ...currentIndividual,
      programName: values.programName,
    });

    pushData();
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
      clubName: item.clubname,
    });
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
        {` Selected Club: ${currentIndividual.clubName}`}
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
