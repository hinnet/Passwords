import { Button, StyleSheet, SafeAreaView, Text } from 'react-native';

export default function IndexScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Index</Text>
            <Button
            title="Passwords"
            onPress={() => navigation.navigate('Passwords')} // Navigate to the Passwords screen
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