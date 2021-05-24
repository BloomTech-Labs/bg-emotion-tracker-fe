import React, { useState } from 'react';
import { Modal, Button, Alert } from 'antd';
import { postClub } from '../../../../state/actions';
import ClubTable from './ClubTable';
import AddIndividual from './AddIndividual';

const ImportModal = props => {
  const { fetchClubs } = props;
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
    // Send data to backend
    if (inputData.individual.length > 0) {
      inputData.individual.forEach(item => {
        console.log(item);
        postClub(item);
      });
    }
    setIsModalVisible(false);
    clearState();
    setTimeout(() => {
      fetchClubs();
    }, 2000);
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
        Add Clubs
      </Button>
      <Modal
        title="Add Clubs"
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
          <AddIndividual
            setInputData={setInputData}
            inputData={inputData}
            showAlert={showAlert}
          />
          <ClubTable inputData={inputData} />
        </div>
        <div></div>
      </Modal>
    </>
  );
};

export default ImportModal;
