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
  const { setScanStatus, handleError } = props;
  const memberContext = useContext(MemberContext);
  const [memberId, setMemberId] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    if (memberContext.exists === true) {
      // set member context with memberId
      memberContext.setMemberId(memberId);
      memberContext.setMemberExists(true);
      setScanStatus(true);
    } else if (memberContext.exists === false) {
      handleError('This member does not exist.');
    }
  }, [memberContext.exists]);

  const onFinish = async values => {
    await getMember(values.memberId, memberContext);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onChange = e => {
    setMemberId(e.target.value);
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
          <Input onChange={onChange} />
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
