import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { database } from '../firebase/firebaseConfig';
import { ref, set } from "firebase/database";
import { Button, HelperText, TextInput, IconButton, Text } from 'react-native-paper';
import EmailValidation from '../validation/input/EmailValidation';
import WebsiteValidation from '../validation/input/WebsiteValidation';
import { getPassword } from '../passwordApi';
import { getCurrentUser } from '../firebase/currentUser';
import { encryptPassword } from '../crypto/PasswordEncryption';

export default function EditPasswordScreen({ route, navigation }) {
    const item = route.params.data;
    const [loginCredentials, setLoginCredentials] = useState({
        email: item.email,
        website: item.website,
        hashPassword: item.hashPassword,
    });
    const [emailError, setEmailError] = useState(false);
    const [websiteError, setWebsiteError] = useState(false);
    
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
        const generatedPassword = await getPassword();
        const encryptedPassword = await encryptPassword(generatedPassword);
        setLoginCredentials({...loginCredentials, hashPassword: encryptedPassword });
    };
    
    
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
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
            <View style={styles.wrapper}>
                <Text style={styles.floatingLabel}>Password</Text>
                <View style={styles.passwordBox}>
                <Text style={styles.passwordText}>{loginCredentials.hashPassword}</Text>
                <IconButton
                icon="reload"
                size={20}
                onPress={generateNewPassword}
                />
            </View>
            </View>
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
        borderRadius: 5,
    },
    helperText: {
        marginTop: -5,
        marginLeft: 25,
        alignSelf: 'flex-start',
    },
    wrapper: {
        marginVertical: 20,
        position: 'relative',
        width: '100%',
    },
    floatingLabel: {
        position: 'absolute',
        top: -3,
        left: 39,
        backgroundColor: '#fff',
        paddingHorizontal: 6,
        fontSize: 12,
        color: '#666',
        zIndex: 1,
    },
    passwordBox: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 30,
        height: 60,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 4,
        paddingLeft: 15,
        backgroundColor: '#fff',
    },
    passwordText: {
        color: 'grey',
        fontSize: 16,
    },
});