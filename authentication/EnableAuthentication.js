import { Alert } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

export async function EnableAuthentication() {
    console.log('enable try');
    const Biometrics = new ReactNativeBiometrics();
    try {
        const resultObject = await Biometrics.isSensorAvailable();
        const { available, biometryType } = resultObject;

        if (available && (biometryType === BiometryTypes.TouchID || BiometryTypes.FaceID)) {
            Alert.alert(`${biometryType}`, `Would you like to enable ${biometryType} authentication for this app?`, [
                {
                    text: 'Yes',
                    onPress: async () => {
                    Alert.alert('Success!', `${biometryType} authentication enabled successfully!`);
                    },
                },
                { text: 'Cancel', style: 'cancel' },
            ]);
            // Returns true if TouchID or FaceID is available
            return true;
        } else if (available && biometryType === BiometryTypes.Biometrics) {
            Alert.alert('Device Supported Biometrics', 'Biometrics authentication is supported.');
            // Returns true if biometric authentication is available
            return true;
        } else {
            Alert.alert('Biometrics not supported', 'This device does not support biometric authentication.');
            // Returns false if biometric authentication is not available
            return false;
        }
    }  catch(err) {
        console.error('Error in biometrics checking: ', err);
        Alert.alert('Error', 'An error occurred while checking biometrics availability.');
        // Returns false if error occurs
        return false;
    }
};

// export async function EnableAuthentication() {
//     const Biometrics = new ReactNativeBiometrics();
//     try {
//         const resultObject = await Biometrics.isSensorAvailable();
//         const { available, biometryType } = resultObject;

//         if (available && (biometryType === BiometryTypes.TouchID || BiometryTypes.FaceID)) {
//             const confirmed = await alertForEnabling(`${biometryType}`, `Would you like to enable ${biometryType} authentication for this app?`);
            
//             if (confirmed) {
//                 Alert.alert('Success!', `${biometryType} authentication enabled successfully!`);
//                 // Returns true if TouchID or FaceID is enabled
//                 return true;
//             } else {
//                 return false;
//             }
//         } else if (available && biometryType === BiometryTypes.Biometrics) {
//             Alert.alert('Device Supported Biometrics', 'Biometrics authentication is supported.');
//             // Returns true if biometric authentication is available
//             return true;
//         } else {
//             Alert.alert('Biometrics not supported', 'This device does not support biometric authentication.');
//             // Returns false if biometric authentication is not available
//             return false;
//         }
//     } catch(err) {
//         console.error('Error in biometrics checking: ', err);
//         Alert.alert('Error', 'An error occurred while checking biometrics availability.');
//         // Returns false if error occurs
//         return false;
//     }
// }

// function alertForEnabling(title, message) {
//     return new Promise((resolve) => {
//         Alert.alert(title, message, [
//             {
//                 text: 'Yes',
//                 onPress: () => resolve(true),
//             },
//             {
//                 text: 'Cancel',
//                 onPress: () => resolve(false),
//                 style: 'cancel',
//             },
//         ]);
//     });
// }