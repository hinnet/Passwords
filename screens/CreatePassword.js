import { useState } from 'react';
import { SafeAreaView, StyleSheet, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { database } from '../firebase/firebaseConfig';
import { ref, push } from "firebase/database";
import { Button, HelperText, TextInput, IconButton, Text } from 'react-native-paper';
import { EmailValidation, WebsiteValidation } from '../validation/InputValidation';
import CryptoJS from 'crypto-js';
import { getPassword } from '../password_api';
import { useEffect } from 'react';

export default function CreatePassword() {
    const [password, setPassword] = useState({
        email: '',
        website: '',
        generatedPassword: '',
    })
    const [emailError, setEmailError] = useState(false);
    const [websiteError, setWebsiteError] = useState(false);

    useEffect(() => {
        generateNewPassword();
    }, []);

    const handleSave = () => {
        setEmailError(!EmailValidation(password.email));    // If email isn't valid, set error true
        setWebsiteError(!WebsiteValidation(password.website));    // Same with website
        if (emailError || websiteError) {
            return;
        } else {
            push(ref(database, '/passwords'), password);
        }
    };

    const generateNewPassword = () => {
        setPassword({...password, generatedPassword: getPassword()})
    };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.container}>
        <TextInput
        label="Email"
        mode='outlined'
        value={password.email}
        onChangeText={email => setPassword({...password, email})}
        style={styles.input}
        />
        <HelperText style={styles.helperText} type='error' visible={emailError}>
            Enter valid email address
        </HelperText>
        <TextInput
        label="Website"
        mode='outlined'
        value={password.website}
        onChangeText={website => setPassword({...password, website})}
        style={styles.input}
        />
        <HelperText style={styles.helperText} type='error' visible={websiteError}>
            Set website or service provider
        </HelperText>
        <View style={styles.wrapper}>
            <Text style={styles.floatingLabel}>Password</Text>
            <View style={styles.passwordBox}>
            <Text style={styles.passwordText}>{password.generatedPassword}</Text>
            <IconButton
            icon="reload"
            size={20}
            onPress={(generateNewPassword)}
            />
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
  });