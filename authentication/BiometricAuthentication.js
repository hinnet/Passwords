import { Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export async function BiometricAuthentication(setIsLoggedIn) {
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
        })

        if (result.success) {
            setIsLoggedIn(true);
            Alert.alert('Authenticated', 'Welcome!');
            return true;
        }
    } catch (err) {
        console.error('Error in authentication: ', err);
        Alert.alert('An error has occurred');
        return false;
    };
};