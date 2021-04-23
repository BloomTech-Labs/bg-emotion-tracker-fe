import React from 'react';
import { Document, Page, Text, Image, View } from '@react-pdf/renderer';

const PDFcomponent = props => {
  const { PDFImageIds } = props;

  const IdsArray = [];

  const resultArray = PDFImageIds.map(id => {
    IdsArray.push(id);
    return document.getElementById(id).toDataURL();
  });

  return (
    <Document>
      {resultArray.map((dataURL, id) => {
        return (
          <Page
            key={`PageId_${id}`}
            size={'A10'}
            style={{ backgroundColor: 'white' }}
          >
            <View style={{ display: 'inline' }}>
              <Image
                allowDangerousPaths
                src={dataURL}
                style={{ width: '50%' }}
              />
              <Text style={{ color: '#0081C6' }}>{IdsArray[id]}</Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default PDFcomponent;
