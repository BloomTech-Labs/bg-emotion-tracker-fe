import React, { useState } from 'react';
import { Modal, Button, Alert } from 'antd';
import MemberTable from './MemberTable';
import AddIndividual from './AddIndividual';
import ImportUpload from './ImportUpload';
import { QRCodeGenerator } from '../../QRCodeGenerator';

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
  //QRCode generation and download hook
  const [generateQR, setGenerateQR] = useState(false);
  const [valueStrings, setValueStrings] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // upload data to server
    // generate id cards
    // After Response show completed
    console.warn('submited');
    showAlert('Members successfully added', 'success');
    clearState();
    //QR Component
    setGenerateQR(true);
    setValueStrings(inputData.individual);
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
        Generate ID Cards
      </Button>
      <Modal
        title="Import Member"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'70%'}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Generate
          </Button>,
        ]}
      >
        {alertData.isVisable ? (
          <Alert
            message={alertData.text}
            type={alertData.type}
            closable
            afterClose={handleAlertClose}
          />
        ) : null}
        {/*QRCodeGenerator component*/
        generateQR ? <QRCodeGenerator valueStrings={valueStrings} /> : null}
        <div>
          <h2>Add Individual Member</h2>
          <AddIndividual
            setInputData={setInputData}
            inputData={inputData}
            showAlert={showAlert}
          />
        </div>
        <div>
          <h2>Upload Members</h2>
          <ImportUpload
            inputData={inputData}
            setInputData={setInputData}
            showAlert={showAlert}
            clearState={clearState}
          />
        </div>
        <MemberTable inputData={inputData} />
      </Modal>
    </>
  );
};

export default ImportModal;
