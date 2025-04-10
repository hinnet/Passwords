import { Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

export async function HandleAuthentication() {
    const Biometrics = new ReactNativeBiometrics();

    try {
        const { success } = await Biometrics.simplePrompt({ promptMessage: 'Authenticate to continue' });

        if (success) {
            Alert.alert('Authenticated', 'Welcome!');
            return true;
        } else {
            Alert.alert('Authentication failed');
            return false;
        }
    } catch (err) {
        console.error('Error in authentication: ', err);
        Alert.alert('Error', 'Authentication failed from device');
        return false;
    }
};