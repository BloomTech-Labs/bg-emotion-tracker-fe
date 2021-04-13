import React from 'react';

// Import for kids csv
const ImportKidsPage = () => {
  const handleFile = e => {
    const file = e.target.files;
    console.warn('Data File', file);
  };
  return (
    <div>
      <h1>Import</h1>
      <input
        type="file"
        name="file_input"
        onChange={e => {
          handleFile(e);
        }}
      ></input>
    </div>
  );
};

export default ImportKidsPage;
