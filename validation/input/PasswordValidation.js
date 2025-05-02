import { auth } from "../../firebase/firebaseConfig";
import { validatePassword } from 'firebase/auth';

export async function PasswordValidation(passwordFromUser) {
    const status = await validatePassword(auth, passwordFromUser);
    return (status.isValid);
};