import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserTypeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How will you use W4U?</Text>
      {/* TODO: Three illustrated cards: "I Offer Services", "I Need Services", "Both" */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B7A3D', textAlign: 'center' },
});

export default UserTypeScreen;
