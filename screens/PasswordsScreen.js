import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

export default function PasswordsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Passwords</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});