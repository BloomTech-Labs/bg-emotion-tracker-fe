import React from 'react';
import QrReader from 'modern-react-qr-reader';

const QRCodeReader = props => {
  const handleError = err => {
    console.error(err);
  };

  const handleScan = data => {
    if (data) {
      console.log(data);
    }
  };

  return (
    <div>
      <QrReader
        delay={300}
        facingMode={'environment'}
        style={{ width: '50%' }}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  );
};

export default QRCodeReader;
