import React from 'react';
import QRCode from 'qrcode.react';

const QRGenerator = props => {
  let valueString = 'http://picturesofpeoplescanningqrcodes.tumblr.com/';

  return (
    <QRCode
      value={valueString}
      size={128}
      bgColor={'#ffffff'}
      fgColor={'#000000'}
      level={'L'}
      includeMargin={false}
      renderAs={'svg'}
      imageSettings={{
        src: 'https://static.zpao.com/favicon.png',
        x: null,
        y: null,
        height: 24,
        width: 24,
        excavate: true,
      }}
    />
  );
};

export default QRGenerator;
