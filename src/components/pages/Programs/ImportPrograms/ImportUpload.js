import React from 'react';
import styled from 'styled-components';

const StyledUpload = styled.div`
  .custom-file-upload {
    border: 1px solid #1890ff;
    border-radius: 5px;
    display: inline-block;
    padding: 4px 15px;
    cursor: pointer;
    color: #fff;
    background: #0081c6;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  }
  input[type='file'] {
    display: none;
  }
`;

const ImportUpload = props => {
  const { inputData, setInputData, showAlert } = props;

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
      e.target.value = null;
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file);
    // Runs after file is read
    reader.onload = readerEvent => {
      // Getting members to list and appending to inputData
      const values = readerEvent.target.result;
      // Seperates by line break
      const listOfValues = values.match(/[^\r\n]+/g);
      // Seperate by comma
      /*programName: , clubId */
      const listOfValueObjects = [];
      listOfValues.forEach(item => {
        const items = item.match(/([^,]+)/g);
        const newItem = { programName: items[0], clubId: items[1] };
        listOfValueObjects.push(newItem);
      });

      setInputData({
        ...inputData,
        file: listOfValueObjects,
      });
    };
  };

  return (
    <>
      <StyledUpload>
        <label htmlFor="file-upload" className="custom-file-upload">
          Upload CSV
        </label>

        <input
          id="file-upload"
          type="file"
          name="fileUplaod"
          onChange={e => onChange(e)}
        />
      </StyledUpload>
    </>
  );
};

export default ImportUpload;
