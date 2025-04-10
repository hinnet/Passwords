import { Button, TextInput } from 'react-native-paper';
import { Keyboard, TouchableWithoutFeedback, StyleSheet, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('Sign in');
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Error', 'An error occurred during sign up');
            })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <TextInput 
                label="Email"
                mode='outlined'
                value={email}
                onChangeText={email => setEmail(email)}
                style={styles.input}
                />
                <TextInput 
                label="Password"
                mode='outlined'
                value={password}
                onChangeText={password => setPassword(password)}
                secureTextEntry
                right={<TextInput.Icon icon="eye" />}
                style={styles.input}
                />
                <Button 
                mode="contained"
                onPress={handleSignUp}
                style={styles.button}
                labelStyle={{ fontSize: 16 }}
                >
                    Sign up
                </Button>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        alignSelf: 'stretch',
        marginVertical: 5,
        marginHorizontal: 30,
        height: 60,
    },
    button: {
        justifyContent: 'center',
        height: 50,
        margin: 15,
        borderRadius: 5,
      },
  });