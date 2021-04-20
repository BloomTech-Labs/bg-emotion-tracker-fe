import React from 'react';
import QRCode from 'qrcode.react';

const QRGenerator = props => {
  const { valueString, documentId } = props;

  return (
    <div>
      <QRCode
        id={documentId}
        value={valueString}
        size={290}
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={'H'}
        includeMargin={true}
      />
    </div>
  );
};

export default QRGenerator;
