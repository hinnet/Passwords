import { useState, useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { database } from '../firebase/firebaseConfig';
import { ref, push } from "firebase/database";
import { ActivityIndicator, Button, HelperText, TextInput, IconButton, Text } from 'react-native-paper';
import EmailValidation from '../validation/input/EmailValidation';
import WebsiteValidation from '../validation/input/WebsiteValidation';
import { getPassword } from '../passwordApi';
import { getCurrentUser } from '../firebase/currentUser';
import { encryptPassword } from '../crypto/PasswordEncryption';

export default function CreatePassword({ navigation }) {
    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        website: '',
        hashPassword: '',
    });
    const [emailError, setEmailError] = useState(false);
    const [websiteError, setWebsiteError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        generateNewPassword();
    }, []);

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

            await push(ref(database, `users/${user.uid}/loginCredentials`), loginCredentials);
            Alert.alert('Password saved successfully!');
            navigation.popToTop();    // returns to Home-page
        } catch (err) {
            console.error(err);
            Alert.alert('Not able to save password', 'Please, try again.');
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
        <TextInput
        label="Email"
        mode='outlined'
        value={loginCredentials.email}
        onChangeText={email => setLoginCredentials({...loginCredentials, email})}
        style={styles.input}
        />
        <HelperText style={styles.helperText} type='error' visible={emailError}>
            Enter valid email address
        </HelperText>
        <TextInput
        label="Website"
        mode='outlined'
        value={loginCredentials.website}
        onChangeText={website => setLoginCredentials({...loginCredentials, website})}
        style={styles.input}
        />
        <HelperText style={styles.helperText} type='error' visible={websiteError}>
            Set website or service provider
        </HelperText>
        <View style={styles.wrapper}>
            <Text style={styles.floatingLabel}>Password</Text>
            <View style={styles.passwordBox}>
            <Text style={styles.passwordText}>{loginCredentials.hashPassword}</Text>
            { loading ? ( 
                <ActivityIndicator style={styles.activityIndicator} /> 
            ) : ( 
                <IconButton
                icon="reload"
                size={25}
                onPress={generateNewPassword}
                /> 
                )
            }

            
        </View>
        </View>
        <Button 
        mode="contained"
        onPress={handleSave}
        style={styles.button}
        labelStyle={{ fontSize: 16 }}
        >
            Save new password
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
    activityIndicator: {
        size: 11,
        marginRight: 15,
    },
});