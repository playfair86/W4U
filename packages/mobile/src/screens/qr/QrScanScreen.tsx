import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QrScanScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Scan</Text>
      {/* TODO: Camera viewfinder, QR overlay, tip amount selector */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B7A3D' },
});

export default QrScanScreen;
