import { useState } from 'react';
import { SafeAreaView, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { database } from '../firebaseConfig';
import { ref, push } from "firebase/database";
import { Button, HelperText, TextInput } from 'react-native-paper';
import { EmailValidation, WebsiteValidation } from '../components/InputValidation';

export default function CreatePassword() {
    const [password, setPassword] = useState({
        email: '',
        website: '',
    })
    const [emailError, setEmailError] = useState(false);
    const [websiteError, setWebsiteError] = useState(false);

    const handleSave = () => {
        setEmailError(EmailValidation(password.email));
        setWebsiteError(WebsiteValidation(password.website));
        if (emailError || websiteError) {
            return;
        } else {
            push(ref(database, '/passwords'), password);
        }
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
        <HelperText type='error' visible={emailError}>
            Enter valid email address
        </HelperText>
        <TextInput
        label="Website"
        mode='outlined'
        value={password.website}
        onChangeText={website => setPassword({...password, website})}
        style={styles.input}
        />
        <HelperText type='error' visible={websiteError}>
            Set website or service provider
        </HelperText>
        <Button 
        mode="contained"
        onPress={handleSave}
        style={styles.button}
        labelStyle={{ fontSize: 16 }}
        >
            Create
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