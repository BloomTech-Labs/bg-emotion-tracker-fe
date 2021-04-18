import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import MemberList from './MemberList';
const ImportUpload = props => {
  const [fileState, setFileState] = useState([]);
  const onFormSubmit = () => {
    // upload data to server
    return;
  };

  const onChange = e => {
    const file = e.target.files[0];
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
      <MemberList listOfMembers={fileState} />
      <div onSubmit={onFormSubmit}>
        <input type="file" name="fileUplaod" onChange={e => onChange(e)} />
        <Button type="primary">Submit</Button>
      </div>
    </>
  );
};

export default ImportUpload;
