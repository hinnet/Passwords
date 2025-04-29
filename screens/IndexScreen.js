import { Button, StyleSheet, SafeAreaView } from 'react-native';
import signUserOut from '../firebase/signUserOut';

export default function IndexScreen({ navigation, setIsLoggedIn }) {
    return (
        <SafeAreaView style={styles.container}>
            <Button
            title="Passwords"
            onPress={() => navigation.navigate('Passwords')}
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