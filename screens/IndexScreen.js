import { Button, StyleSheet, SafeAreaView } from 'react-native';
import signUserOut from '../firebase/signUserOut';
import { BiometricAuthentication } from '../authentication/BiometricAuthentication';
import { Alert } from 'react-native';

export default function IndexScreen({ navigation, setIsLoggedIn }) {

    const handleAuthentication = async () => {
        const authorized = await BiometricAuthentication();
        if (authorized) {
            navigation.navigate('Passwords');
        } else {
            Alert.alert('Access denied');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Button 
            title="Passwords"
            onPress={() => handleAuthentication()}
            />
            <Button
            title="Create Password"
            onPress={() => navigation.navigate('Create Password')}
            />
            <Button
            title="Sign Out"
            onPress={() => signUserOut(setIsLoggedIn)}
            />
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