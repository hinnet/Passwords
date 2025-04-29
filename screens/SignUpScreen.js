import { Button, HelperText, TextInput } from 'react-native-paper';
import { Alert, Keyboard, TouchableWithoutFeedback, StyleSheet, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { EmailValidation, PasswordValidation } from '../validation/InputValidation';

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [secure, setSecure] = useState(true);

    const handleSignUp = () => {
        setEmailError(EmailValidation(email));
        setPasswordError(PasswordValidation(password));
        if (emailError || passwordError) {
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            Alert.alert('Sign up successful!');
            navigation.navigate('Sign in');
        })
        .catch((error) => {
            console.error(error.message);
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'Email is already in use');
            } else {
                Alert.alert('Error', 'An error occurred');
            }
        })
    }

    const passwordDisplay = () => {
        setSecure(!secure);
    };

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
                <HelperText style={styles.helperText} type='error' visible={emailError}>
                    Enter valid email address
                </HelperText>
                <TextInput 
                label="Password"
                mode='outlined'
                value={password}
                onChangeText={password => setPassword(password)}
                secureTextEntry={secure}
                right={
                    <TextInput.Icon
                        icon={secure ? "eye-off" : "eye"}
                        onPress={passwordDisplay}
                    />
                }
                style={styles.input}
                />
                <HelperText style={styles.helperText} type='error' visible={passwordError}>
                    Password too short
                </HelperText>
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
    helperText: {
        marginTop: -5,
        marginLeft: 25,
        alignSelf: 'flex-start',
    },
  });