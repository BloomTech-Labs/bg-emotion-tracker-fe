import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { ProgramContext } from '../../../state/contexts/index';

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
  const { setScanStatus } = props;
  const { memberObject, setMemberObject } = useContext(ProgramContext);

  const onFinish = values => {
    const newMemberObject = { ...memberObject, memberId: values.memberId };
    setMemberObject(newMemberObject);
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
