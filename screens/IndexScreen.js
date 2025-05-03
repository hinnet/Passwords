import { Alert, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Text } from 'react-native-paper';
import signUserOut from '../firebase/signUserOut';
import { BiometricAuthentication } from '../authentication/BiometricAuthentication';

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
            <Card style={styles.cardContainer} onPress={() => handleAuthentication()}>
                <Card.Content>
                    <Text variant="titleLarge">Passwords</Text>
                </Card.Content>
            </Card>
            <Card style={styles.cardContainer} onPress={() => navigation.navigate('Create Password')}>
                <Card.Content>
                    <Text variant="titleLarge">Create Password</Text>
                </Card.Content>
            </Card>
            <Card style={styles.cardContainer} onPress={() => signUserOut(setIsLoggedIn)}>
                <Card.Content>
                    <Text variant="titleLarge">Sign out</Text>
                </Card.Content>
            </Card>
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
    cardContainer: {
      width: '90%',
      padding: 20,
      margin: 20,
      alignItems: 'center',
    },
});