import React from 'react';
import QrReader from 'modern-react-qr-reader';

const QRCodeReader = props => {
  const { handleScan } = props;

  const handleError = err => {
    console.error(err);
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
