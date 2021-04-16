import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { parseCSV } from '../../../utils/parseCSV';
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
        Import
      </Button>
      <Modal
        title="Import Kids"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <h3>Single Entry</h3>
        </div>
        <div>
          <h3>Upload</h3>
        </div>
      </Modal>
    </>
  );
};

export default ImportModal;
