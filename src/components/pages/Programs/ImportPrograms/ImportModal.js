import React, { useState } from 'react';
import { Modal, Button, Alert } from 'antd';
import ProgramList from './ProgramList';
import AddIndividual from './AddIndividual';
import ImportUpload from './ImportUpload';

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
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Programs
      </Button>
      <Modal
        title="Add a Program"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'70%'}
      >
        {alertData.isVisable ? (
          <Alert
            message={alertData.text}
            type={alertData.type}
            closable
            afterClose={handleAlertClose}
          />
        ) : null}
        <div>
          <h2>Add a Single Program</h2>
          <AddIndividual
            setInputData={setInputData}
            inputData={inputData}
            showAlert={showAlert}
          />
        </div>
        <div>
          <h2>Add programs by .csv file</h2>
          <ImportUpload
            inputData={inputData}
            setInputData={setInputData}
            showAlert={showAlert}
            clearState={clearState}
          />
        </div>
        <div>
          <h3>Preview</h3>
          <ProgramList inputData={inputData} />
        </div>
      </Modal>
    </>
  );
};

export default ImportModal;
