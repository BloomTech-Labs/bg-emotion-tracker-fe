import React, { useEffect } from 'react';
import { Button } from 'antd';

const ImportUpload = ({ fileState, setFileState, showAlert, clearState }) => {
  const onFormSubmit = () => {
    // upload data to server
    // After Response show completed
    console.warn('submited');
    showAlert('Members successfully added', 'success');
    clearState();
    return;
  };

  const onChange = e => {
    const file = e.target.files[0];
    // Checking if correct file type
    if (file.type !== 'text/csv') {
      // Display wrong file format error
      showAlert('File type must be .csv', 'error');
      // Reset upload
      document.getElementById('file_form').reset();
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = readerEvent => {
      const members = readerEvent.target.result;
      const listOfMembers = members.match(/.{1,10}/g); // Splits input every 10 characters
      setFileState(...fileState, listOfMembers);
    };
  };

  useEffect(() => {}, [fileState]);

  return (
    <>
      <form id="file_form" className="submit_container">
        <input type="file" name="fileUplaod" onChange={e => onChange(e)} />
        <Button type="primary" onClick={onFormSubmit}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default ImportUpload;
