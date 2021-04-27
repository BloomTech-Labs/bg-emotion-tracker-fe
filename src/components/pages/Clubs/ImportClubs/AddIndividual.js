import React from 'react';
import { Form, Input, Button } from 'antd';

const layout = {};
const tailLayout = {};

export const AddIndividual = props => {
  const { inputData, setInputData } = props;

  const onFinish = values => {
    const newList = inputData.individual;
    newList.push(values.clubName);
    setInputData({
      ...inputData,
      individual: newList,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="addIndividual"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ 'margin-bottom': '2rem' }}
    >
      <Form.Item
        label="Club Name"
        name="clubName"
        rules={[{ required: true, message: 'Please a valid club Name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddIndividual;
