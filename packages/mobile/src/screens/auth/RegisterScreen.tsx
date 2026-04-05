import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RegisterScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Enter your mobile number to get started</Text>
      {/* TODO: Phone number input with +27 prefix, language selector */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1B7A3D' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 8, textAlign: 'center' },
});

export default RegisterScreen;
