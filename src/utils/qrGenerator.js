import React from 'react';
import QRCode from 'qrcode.react';

const QRGenerator = props => {
  let valueString = 'https://www.youtube.com/';

  const downloadQR = () => {
    const canvas = document.getElementById('qrcode-1');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode-1.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <QRCode
        id="qrcode-1"
        value={valueString}
        size={290}
        //bgColor={'#ffffff'}
        //fgColor={'#000000'}
        level={'H'}
        includeMargin={true}
        //renderAs={'svg'}
        /*imageSettings={{
        src: 'https://static.zpao.com/favicon.png',
        x: null,
        y: null,
        height: 24,
        width: 24,
        excavate: true,
      }}*/
      />
      <button onClick={downloadQR}> Download QR</button>
    </div>
  );
};

export default QRGenerator;
