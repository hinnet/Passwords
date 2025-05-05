/*
This module handles biometric authentication using expo-local-authentication,
primarily targeting iOS Face ID and Touch ID support.
*/

import { Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export async function BiometricAuthentication() {
  try {
    // Checks for biometric authentication compatibility on device
    const isCompatible = await LocalAuthentication.hasHardwareAsync();
    if (!isCompatible) {
      Alert.alert("Device is not compatible");
      return true;
      // throw new Error('Device is not compatible');
    }

    // Checks for saved biometrics on device
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert("No FaceID or TouchID found");
      return true;
      // throw new Error('No FaceID or TouchID found');
    }

    // Attempt to use biometrics for authentication
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Use Face ID to log in",
      fallbackLabel: "Use Passcode",
    });

    if (result.success) {
      Alert.alert("Authenticated", "Welcome!");
      return true;
    }
  } catch (err) {
    console.error("Error in authentication: ", err);
    return false;
  }
}
