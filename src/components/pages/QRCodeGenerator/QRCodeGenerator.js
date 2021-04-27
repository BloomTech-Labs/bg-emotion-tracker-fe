import React from 'react';
import QRGenerator from './qrGenerator';
import PDFcomponent from './PDFcomponent';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from 'antd';

const QRCodeGenerator = props => {
  const { valueStrings } = props;
  const downloadName = 'qrcodes';

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
        {({ loading }) =>
          loading ? (
            'Loading document...'
          ) : (
            <Button
              type="primary"
              style={{ 'margin-top': '1rem', 'margin-bottom': '2rem' }}
            >
              Download PDF
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default QRCodeGenerator;
