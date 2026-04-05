import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      {/* TODO: List/map toggle, filter bar, provider cards */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B7A3D' },
});

export default SearchScreen;
