import React from 'react';
import QRGenerator from './qrGenerator';
import PDFcomponent from './PDFcomponent';
import { PDFDownloadLink } from '@react-pdf/renderer';

const QRCodeGenerator = props => {
  const downloadName = 'qrcodes';
  const valueStrings = ['111112', '222223', '441243'];

  return (
    <div>
      <div>
        {valueStrings.map(valueString => {
          return (
            <div style={{ display: 'none' }} key={`qrGenerator_${valueString}`}>
              <QRGenerator valueString={valueString} documentId={valueString} />
            </div>
          );
        })}
      </div>
      <PDFDownloadLink
        document={<PDFcomponent PDFImageIds={valueStrings} />}
        fileName={`${downloadName}.pdf`}
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default QRCodeGenerator;
