import React, { useState } from 'react';
import { Modal, Button, Alert } from 'antd';
import MemberTable from './MemberTable';
import AddIndividual from './AddIndividual';
import ImportUpload from './ImportUpload';
import { QRCodeGenerator } from '../../QRCodeGenerator';
import { postMember } from '../../../../state/actions';

const ImportModal = props => {
  const { fetchMembers } = props;
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
    if (inputData.individual.length > 0) {
      inputData.individual.forEach(item => {
        postMember(item);
      });
    }
    setIsModalVisible(false);
    clearState();
    setTimeout(() => {
      fetchMembers();
    }, 2000);
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

  const clearState = () => {
    setInputData({
      individual: [],
      file: [],
    });
    setValueStrings([]);
    setGenerateQR(false);
    setAlertData({
      isVisable: false,
      type: 'success',
      text: '',
    });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Generate ID Cards
      </Button>
      <Modal
        title="Generate ID Cards"
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
          <Alert message={alertData.text} type={alertData.type} />
        ) : null}
        {/*QRCodeGenerator component*/
        generateQR ? <QRCodeGenerator valueStrings={valueStrings} /> : null}
        <div>
          <h2>Generate Single ID Card</h2>
          <AddIndividual
            setInputData={setInputData}
            inputData={inputData}
            showAlert={showAlert}
          />
        </div>
        <div>
          <h2>Generate ID Cards from .csv Member List</h2>
          <ImportUpload
            inputData={inputData}
            setInputData={setInputData}
            showAlert={showAlert}
            clearState={clearState}
          />
        </div>
        <h2 style={{ 'margin-top': '2rem' }}>Preview</h2>
        <MemberTable inputData={inputData} />
      </Modal>
    </>
  );
};

export default ImportModal;
