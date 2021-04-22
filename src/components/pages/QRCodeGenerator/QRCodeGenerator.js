import React from 'react';
import QRGenerator from './qrGenerator';
import PDFcomponent from './PDFcomponent';
import { PDFDownloadLink } from '@react-pdf/renderer';

const QRCodeGenerator = props => {
  const documentId = 'qrcode-1';
  const downloadName = 'qrcode-1';
  const valueString = 'https://www.youtube.com';

  const downloadQRimage = () => {
    const canvas = document.getElementById(documentId);
    const jpgUrl = canvas
      .toDataURL('image/jpeg')
      .replace('image/jpeg', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = jpgUrl;
    downloadLink.download = `${downloadName}.jpg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <QRGenerator valueString={valueString} documentId={documentId} />
      <PDFDownloadLink
        document={<PDFcomponent PDFImageId={documentId} />}
        fileName={`${downloadName}.pdf`}
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
      <button onClick={downloadQRimage}> Download JPEG</button>
    </div>
  );
};

export default QRCodeGenerator;
