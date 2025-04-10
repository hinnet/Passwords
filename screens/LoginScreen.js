import { Alert, Button, StyleSheet, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen({ setIsLoggedIn }) {
  const authenticate = async () => {
    try {
      // Checks for biometric authentication compatibility on device
      const isCompatible = await LocalAuthentication.hasHardwareAsync();
      if (!isCompatible) {
        throw new Error('Device is not compatible.');
      }

      // Checks for saved biometrics on device
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        throw new Error('No FaceID or TouchID found');
      }

      // Attempt to use biometrics for authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Use Face ID to log in',
        fallbackLabel: 'Use Passcode',
      });
      if (result.success) {
        Alert.alert('Authenticated', 'Welcome!');
        setIsLoggedIn(true);
      }

    } catch (err) {
      console.error("Error in authentication: ", err);
      Alert.alert('An error has occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in with Face ID" onPress={authenticate} />
    </View>
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

// import { Button, StyleSheet, View } from 'react-native';
// import { EnableAuthentication } from '../authentication/EnableAuthentication';
// import { HandleAuthentication } from '../authentication/HandleAuthentication';

// export default function LoginScreen({ setIsLoggedIn }) {

//   const authenticate = async () => {
//     const enableSuccess = await EnableAuthentication();
//     if (!enableSuccess) {
//       // Terminate if biometric authentication is not available
//       return;
//     }

//     const authSuccess = await HandleAuthentication();
//     if (authSuccess) {
//       setIsLoggedIn(true);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Sign in with FaceID / TouchID" onPress={authenticate} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });