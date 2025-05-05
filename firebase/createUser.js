import { generateSalt } from '../crypto/GenerateSalt';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { Alert } from 'react-native';

export async function createUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await generateSalt(user);
        await signOut(auth);
        
        Alert.alert('Sign up successful! Please log in.');
    } catch (error) {
        console.error(error.message);
        Alert.alert('Something went wrong', 'Please try again');
    }
}