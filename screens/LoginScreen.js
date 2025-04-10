import { Button, StyleSheet, View } from 'react-native';
import EnableAuthentication from '../authentication/EnableAuthentication';
import HandleAuthentication from '../authentication/HandleAuthentication';

export default function LoginScreen({ setIsLoggedIn }) {

  const authenticate = async () => {
    const enableSuccess = await EnableAuthentication();
    if (!enableSuccess) {
      // Terminate if biometric authentication is not available
      return;
    }

    const authSuccess = await HandleAuthentication();
    if (authSuccess) {
      setIsLoggedIn(true);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in with FaceID / TouchID" onPress={authenticate} />
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

// import { Alert, Button, StyleSheet, View } from 'react-native';
// import * as LocalAuthentication from 'expo-local-authentication';

// export default function Login() {
//   const onFaceId = async () => {
//     try {
//       const isCompatible = await LocalAuthentication.hasHardwareAsync();  // Checks for biometric authentication compatibility on device

//       if (!isCompatible) {
//         throw new Error('Device is not compatible.')
//       }

//       const isEnrolled = await LocalAuthentication.isEnrolledAsync();   // Checks for saved biometrics on device

//       if (!isEnrolled) {
//         throw new Error('No FaceID or TouchID found')
//       }

//       await LocalAuthentication.authenticateAsync();  // Attempt to use biometrics for authentication

//       Alert.alert('Authenticated', 'Welcome!')
//     } catch (err) {
//       console.error("Error in authentication: ", err);
//       Alert.alert('An error has occurred');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Sign in with Face ID" onPress={onFaceId} />
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