import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Alert } from 'antd';
import ProgramList from './ProgramList';
import AddIndividual from './AddIndividual';
import ImportUpload from './ImportUpload';
import { AdminContext } from '../../../../state/contexts';
import { getClubs, postActivity } from '../../../../state/actions';

const ImportModal = props => {
  const { fetchActivities } = props;
  const adminContext = useContext(AdminContext);
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

  useEffect(() => {
    getClubs('authState', adminContext);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Create new activity in back end
    if (inputData.individual.length > 0) {
      inputData.individual.forEach(item => {
        postActivity(item.club.clubid, item.programName);
      });
    }
    setIsModalVisible(false);
    clearState();
    setTimeout(() => {
      fetchActivities();
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
        Add Programs
      </Button>
      <Modal
        title="Add Programs"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
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
          <h2>Add New Program</h2>
          <AddIndividual
            setInputData={setInputData}
            inputData={inputData}
            showAlert={showAlert}
            adminContext={AdminContext}
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
          <h2 style={{ textAlign: 'center' }}>Preview</h2>
          <ProgramList inputData={inputData} />
        </div>
      </Modal>
    </>
  );
};

export default ImportModal;
