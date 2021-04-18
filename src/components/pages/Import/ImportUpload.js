import React, { useEffect } from 'react';
import { Button } from 'antd';

const ImportUpload = ({ fileState, setFileState }) => {
  const onFormSubmit = () => {
    // upload data to server
    return;
  };

  const onChange = e => {
    const file = e.target.files[0];
    // Checking if correct file type
    if (file.type !== 'text/csv') {
      // Display wrong file format error
      return;
    }
    console.warn(file);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = readerEvent => {
      const members = readerEvent.target.result;
      const listOfMembers = members.match(/.{1,10}/g); // Splits input every 10 characters
      setFileState(...fileState, listOfMembers);
      console.warn(fileState);
    };
  };

  useEffect(() => {}, [fileState]);

  return (
    <>
      <div onSubmit={onFormSubmit}>
        <input type="file" name="fileUplaod" onChange={e => onChange(e)} />
        <Button type="primary">Submit</Button>
      </div>
    </>
  );
};

export default ImportUpload;
