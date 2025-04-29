import { SafeAreaView, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';
import { BiometricAuthentication } from '../authentication/BiometricAuthentication';

export default function BiometricSignIn({ setIsLoggedIn }) {

    const handleBiometricLogin = async () => {
        const success = await BiometricAuthentication();
        if (success) {
          setIsLoggedIn(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Button 
            mode="contained"
            onPress={handleBiometricLogin}
            style={styles.button}
            labelStyle={{ fontSize: 19 }}
            >
                Sign in with Face ID / Touch ID
            </Button>
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
    button: {
        justifyContent: 'center',
        height: 80,
        borderRadius: 5,
        margin: 15,
    },
});