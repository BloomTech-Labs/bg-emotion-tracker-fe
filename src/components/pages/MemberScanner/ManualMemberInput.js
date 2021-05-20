import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { MemberContext } from '../../../state/contexts/index';
import { getMember } from '../../../state/actions';

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
  const memberContext = useContext(MemberContext);
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(memberContext.member);
    if (memberContext.member === true) {
      setScanStatus(true);
    } else {
      console.log("Member doesn't exist");
    }
  }, [memberContext.member]);

  const onFinish = async values => {
    await getMember(values.memberId, memberContext);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
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
          rules={[
            {
              required: true,
              message: 'Please input a Member ID',
            },
          ]}
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
