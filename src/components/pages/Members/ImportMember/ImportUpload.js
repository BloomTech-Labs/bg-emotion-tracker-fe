import React, { useEffect } from 'react';
import { Button } from 'antd';

const ImportUpload = props => {
  const { inputData, setInputData, showAlert, clearState } = props;

  const onChange = e => {
    const file = e.target.files[0];
    // check if file in undefined, fixes case where user closes out of file selector
    if (file === undefined) {
      return;
    }
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
    // Runs after file is read
    reader.onload = readerEvent => {
      // Getting members to list and appending to inputData
      const members = readerEvent.target.result;
      const listOfMembers = members.match(/[^\r\n]+/g);
      setInputData({
        ...inputData,
        file: listOfMembers,
      });
    };
  };

  return (
    <>
      <form id="file_form" className="submit_container">
        <input type="file" name="fileUplaod" onChange={e => onChange(e)} />
      </form>
    </>
  );
};

export default ImportUpload;
