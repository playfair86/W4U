import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WalletScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      {/* TODO: Balance display, Fund/Withdraw/Send buttons, transaction history */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B7A3D' },
});

export default WalletScreen;
