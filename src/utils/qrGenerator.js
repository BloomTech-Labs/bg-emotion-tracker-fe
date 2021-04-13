import React from 'react';
import QRCode from 'qrcode.react';

const QRGenerator = props => {
  // de-constructor part
  // const {valueString, documentId, downloadName} = props
  const valueString = 'https://www.youtube.com/';
  const documentId = 'qrcode-1';
  const downloadName = 'qrcode-1.jpg';

  const downloadQR = () => {
    const canvas = document.getElementById(documentId);
    const pngUrl = canvas
      .toDataURL('image/jpeg')
      .replace('image/jpeg', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = downloadName;
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
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={'H'}
        includeMargin={true}
      />
      <button onClick={downloadQR}> Download QR</button>
    </div>
  );
};

export default QRGenerator;
