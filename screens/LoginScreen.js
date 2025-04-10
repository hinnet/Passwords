// import LoginNavigator from '../navigation/LoginNavigator';

// export default function LoginScreen({ isLoggedIn }) {
//   return (
//     <LoginNavigator setIsLoggedIn={isLoggedIn} />
//   );
// }

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