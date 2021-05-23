import React from 'react';
import QrReader from 'modern-react-qr-reader';

const QRCodeReader = props => {
  const { handleScan, handleError } = props;

  return (
    <div>
      <QrReader
        delay={300}
        facingMode={'environment'}
        style={{ width: 'auto' }}
        onError={handleError}
        onScan={handleScan}
        style={{ marginBottom: '2rem' }}
      />
    </div>
  );
};

export default QRCodeReader;
