import React from 'react';
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

const PDFcomponent = props => {
  const { PDFImageIds } = props;

  const IdsArray = [];

  const styles = StyleSheet.create({
    page: {
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    view: {
      display: 'inline',
    },
    image: {
      width: '50%',
    },
    text: {
      color: '#0081C6',
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
          <Page key={`PageId_${id}`} size={'A10'} style={styles.page}>
            <View style={styles.view}>
              <Image allowDangerousPaths src={dataURL} style={styles.image} />
              <Text style={styles.text}>{IdsArray[id]}</Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default PDFcomponent;
