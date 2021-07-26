import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { YouthContext } from '../../../state/contexts/index';
import { getMember } from '../../../state/actions';

const layout = {};
const tailLayout = {};

function ManualMemberInput(props) {
  const { setScanStatus, handleError } = props;
  const youthContext = useContext(YouthContext);
  const [memberId, setMemberId] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    if (youthContext.exists === true) {
      youthContext.setId(memberId);
      setScanStatus(true);
    } else if (youthContext.exists === false) {
      handleError('This member does not exist.');
    }
  }, [youthContext.exists]);

  const onFinish = async values => {
    await getMember(values.memberId, youthContext);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onChange = e => {
    setMemberId(e.target.value);
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
        className="manualMemberInput"
      >
        <Form.Item
          style={{ height: '100px' }}
          name="memberId"
          rules={[
            {
              required: true,
              message: 'Please input a Member ID',
            },
          ]}
        >
          <Input
            className="memberIDInput"
            placeholder="Member ID"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" className="scannerBtn" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ManualMemberInput;
