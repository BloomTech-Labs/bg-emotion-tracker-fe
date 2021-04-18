import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { parseCSV } from '../../../utils/parseCSV';

import ImportUpload from './ImportUpload';
// Might have to check if file is type csv
// Import for kids csv
const ImportModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          <ImportUpload />
        </div>
      </Modal>
    </>
  );
};

export default ImportModal;
