import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { baseUrl } from '../../../../api/index';
// const baseUrl = "http://localhost:2019";

const layout = {
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 16,
    span: 1,
  },
};

export const AddIndividual = props => {
  const { inputData, setInputData } = props;
  const [activities, setActivities] = useState([]);

  const clubid = 20;
  // this will be handled in context state, hard coded for testing now.

  useEffect(() => {
    let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
    axios
      .get(`${baseUrl}/clubs/clubs`, {
        headers: {
          Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
        },
      })
      .then(res => setActivities(res.data))
      .catch(e => console.log(e));
  }, []);

  const onFinish = values => {
    console.warn(values);
    console.log('values: ', values);
    const newList = inputData.individual;
    newList.push({ programName: values.programName, clubId: values.clubId });
    setInputData({
      ...inputData,
      individual: newList,
    });
    console.log('inputData: ', inputData);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

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
        label="Club ID"
        name="clubId"
        rules={[{ required: true, message: 'Please enter a valid club ID' }]}
      >
        <Input />
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
