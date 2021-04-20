import React from 'react';
import { Document, Page, Text, Image, View } from '@react-pdf/renderer';

const PDFcomponent = props => {
  const { PDFImageId } = props;

  const canvas = document.getElementById(PDFImageId);
  const dataURL = canvas.toDataURL();

  return (
    <Document>
      <Page>
        <View>
          <Text>My document data</Text>
          <Image allowDangerousPaths src={dataURL} />
        </View>
      </Page>
    </Document>
  );
};

export default PDFcomponent;
