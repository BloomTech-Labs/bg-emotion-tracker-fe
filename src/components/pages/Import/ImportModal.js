import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import MemberList from './MemberList';

import ImportUpload from './ImportUpload';
// Might have to check if file is type csv
// Import for kids csv
const ImportModal = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileState, setFileState] = useState([]);

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

  const clearState = () => {
    setFileState([]);
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
        width={'60%'}
      >
        <div>
          <h3>Add Individual Member</h3>
        </div>
        <div>
          <h3>Upload</h3>
          <MemberList listOfMembers={fileState} />
          <ImportUpload fileState={fileState} setFileState={setFileState} />
        </div>
      </Modal>
    </>
  );
};

export default ImportModal;
