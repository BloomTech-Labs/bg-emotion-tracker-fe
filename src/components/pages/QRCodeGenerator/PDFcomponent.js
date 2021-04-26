import React from 'react';
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

import logo from './BGLogo.png';

const PDFcomponent = props => {
  const { PDFImageIds } = props;

  const IdsArray = [];

  const styles = StyleSheet.create({
    page: {
      backgroundColor: 'white',
      display: 'block',
    },
    view: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    QRImage: {
      width: '100%',
      height: '100%',
    },
    text: {
      color: '#0081C6',
      size: '11em',
    },
    logoImage: {
      width: '50%',
      height: '50%',
    },
  });

  const resultArray = PDFImageIds.map(id => {
    IdsArray.push(id);
    return document.getElementById(id).toDataURL();
  });

  return (
    <Document>
      {resultArray.map((dataURL, id) => {
        return (
          <Page key={`PageId_${id}`} size={'A4'} style={styles.page}>
            <View style={styles.view}>
              <Image allowDangerousPaths src={dataURL} style={styles.QRImage} />
              <Image src={logo} style={styles.logoImage} />
            </View>
            <View style={styles.view}>
              <Text style={styles.text}>{IdsArray[id]}</Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default PDFcomponent;
