import { Button, StyleSheet, SafeAreaView } from 'react-native';

export default function IndexScreen({ navigation }) {
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