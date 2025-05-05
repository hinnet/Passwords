import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { database } from '../firebase/firebaseConfig';
import { ref, set } from "firebase/database";
import { ActivityIndicator, Button, HelperText, TextInput, IconButton, Text } from 'react-native-paper';
import EmailValidation from '../validation/input/EmailValidation';
import WebsiteValidation from '../validation/input/WebsiteValidation';
import { getPassword } from '../passwordApi';
import { getCurrentUser } from '../firebase/currentUser';
import { encryptPassword } from '../crypto/PasswordEncryption';
import BackgroundColor from './BackgroundColor';

export default function EditPasswordScreen({ route, navigation }) {
    const item = route.params.data;
    const [loginCredentials, setLoginCredentials] = useState({
        email: item.email,
        website: item.website,
        hashPassword: item.hashPassword,
    });
    const [emailError, setEmailError] = useState(false);
    const [websiteError, setWebsiteError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        const user = await getCurrentUser();
    
        if (!user) {
        console.error('No user logged in');
        return;
        }

        try {
            const emailValid = EmailValidation(loginCredentials.email);
            const websiteValid = WebsiteValidation(loginCredentials.website);
        
            setEmailError(!emailValid);     // If email isn't valid, set error true
            setWebsiteError(!websiteValid);     // Same with website
        
            if (!emailValid || !websiteValid) {
                return;
            }

            await set(ref(database, `users/${user.uid}/loginCredentials/${item.id}`), {
                email: loginCredentials.email,
                website: loginCredentials.website,
                hashPassword: loginCredentials.hashPassword,
            });
            Alert.alert('Password updated successfully!'); 
            navigation.dispatch(StackActions.pop(1));    // Returns to previous page
        } catch (err) {
            console.error(err);
            Alert.alert('Not able to update password', 'Please, try again.');
        }
    };

    const generateNewPassword = async () => {
        setLoading(true);
        try {
            const generatedPassword = await getPassword();
            const encryptedPassword = await encryptPassword(generatedPassword);
            setLoginCredentials({...loginCredentials, hashPassword: encryptedPassword });
        } catch (err) {
            console.error('Error generating new password: ', err);
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
            <BackgroundColor />
            <TextInput
            label="Email"
            mode='outlined'
            value={loginCredentials.email}
            onChangeText={email => setLoginCredentials({...loginCredentials, email: email})}
            style={styles.input}
            />
            <HelperText style={styles.helperText} type='error' visible={emailError}>
                Enter valid email address
            </HelperText>
            <TextInput
            label="Website"
            mode='outlined'
            value={loginCredentials.website}
            onChangeText={website => setLoginCredentials({...loginCredentials, website: website})}
            style={styles.input}
            />
            <HelperText style={styles.helperText} type='error' visible={websiteError}>
                Set website or service provider
            </HelperText>
            <TextInput
            label="Password"
            value={loginCredentials.hashPassword}
            mode='outlined'
            style={styles.input}
            disabled
            right={ 
                loading ? (
                    <TextInput.Icon
                    icon={() => <ActivityIndicator style={styles.activityIndicator} />}
                    />
                ) : (
                    <TextInput.Icon
                    icon='reload'
                    size={25}
                    color="rgb(191, 200, 202)"
                    onPress={generateNewPassword}
                    /> 
                )}
            />
            <Button 
            mode="contained"
            onPress={handleSave}
            style={styles.button}
            labelStyle={{ fontSize: 16 }}
            >
                Update password
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
        marginTop: 30,
        borderRadius: 5,
    },
    helperText: {
        marginTop: -5,
        marginBottom: 10,
        marginLeft: 25,
        alignSelf: 'flex-start',
    },
    activityIndicator: {
        size: 10,
        marginRight: 8,
    },
});