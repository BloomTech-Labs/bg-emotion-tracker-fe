import React, { useState } from 'react';
import { Modal, Button, Alert, Form, Input } from 'antd';
import MemberList from './MemberList';
import AddIndividual from './AddIndividual';
import ImportUpload from './ImportUpload';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const ImportModal = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    isVisable: false,
    type: 'success',
    text: '',
  });
  const [inputData, setInputData] = useState({
    individual: [],
    file: [],
  });

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    clearState();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    clearState();
  };

  const showAlert = (text, type) => {
    setAlertData({
      isVisable: true,
      type: [type],
      text: [text],
    });
  };

  const handleAlertClose = () => {
    setAlertData({
      ...alertData,
      isVisable: false,
    });
  };
  const clearState = () => {
    setInputData({
      individual: [],
      file: [],
    });
    document.getElementById('file_form').reset();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal
        title="Import Member"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'70%'}
      >
        <Form>
          {alertData.isVisable ? (
            <Alert
              message={alertData.text}
              type={alertData.type}
              closable
              afterClose={handleAlertClose}
            />
          ) : null}
          <div>
            <h3>Add Individual Member</h3>
            <AddIndividual
              setInputData={setInputData}
              inputData={inputData}
              showAlert={showAlert}
            />
            <MemberList inputData={inputData} />
          </div>
          <div>
            <ImportUpload
              inputData={inputData}
              setInputData={setInputData}
              showAlert={showAlert}
              clearState={clearState}
            />
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ImportModal;
