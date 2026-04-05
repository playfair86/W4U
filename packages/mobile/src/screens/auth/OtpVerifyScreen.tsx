import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OtpVerifyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to your phone</Text>
      {/* TODO: 6-digit OTP input, auto-verify, resend timer */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1B7A3D' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 8, textAlign: 'center' },
});

export default OtpVerifyScreen;
