import React from 'react';
import QrReader from 'modern-react-qr-reader';

const QRCodeReader = props => {
  const { handleScan, handleError } = props;

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
