import React from 'react';
import { Form, Input, Button } from 'antd';

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

  const onFinish = values => {
    console.warn(values);
    console.log('values: ', values);
    const newList = inputData.individual;
    newList.push({
      programName: values.programName,
      clubName: values.clubName,
    });
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
        label="Club Name"
        name="clubName"
        rules={[{ required: true, message: 'Please enter a valid club name' }]}
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
