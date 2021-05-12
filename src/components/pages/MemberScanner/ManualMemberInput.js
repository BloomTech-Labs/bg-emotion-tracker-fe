import React from 'react';
import { Form, Input, Button } from 'antd';

const layout = {
  // wrapperCol: {
  //   span: 16,
  // },
};
const tailLayout = {
  // wrapperCol: {
  //   offset: 16,
  //   span: 1,
  // },
};

function ManualMemberInput(props) {
  const { setQRdata, setScanStatus } = props;

  const onFinish = values => {
    setQRdata(values);
    setScanStatus(true);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        {...layout}
        layout="inline"
        name="addIndividual"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Member ID"
          name="memberId"
          rules={[{ required: false, message: 'Please a valid user id' }]}
          style={{ 'margin-bottom': '2rem' }}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ManualMemberInput;
