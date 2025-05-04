import { generateSalt } from '../crypto/GenerateSalt';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function createUser(email, password, navigation) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await generateSalt(user);

        Alert.alert('Sign up successful!');
    } catch (error) {
        console.error(error.message);
        Alert.alert('Something went wrong', 'Please try again');
    }
}