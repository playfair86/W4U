import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>W4U</Text>
      <Text style={styles.tagline}>Work For You</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f9f3' },
  logo: { fontSize: 64, fontWeight: 'bold', color: '#1B7A3D' },
  tagline: { fontSize: 18, color: '#666', marginTop: 8, letterSpacing: 4 },
  button: { marginTop: 48, backgroundColor: '#1B7A3D', paddingHorizontal: 48, paddingVertical: 16, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default SplashScreen;
