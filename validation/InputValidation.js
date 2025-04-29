import { auth } from "../firebase/firebaseConfig";
import { validatePassword } from 'firebase/auth';

export async function PasswordValidation(passwordFromUser) {
    const status = await validatePassword(auth, passwordFromUser);
    return (status.isValid);
}

export function EmailValidation(email) {
    const emailRegex = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,}$/; // https://regex101.com/r/lHs2R3/1
    if (!email || !emailRegex.test(email)) {
        return false;
    } else {
        return true;
    }
}

export function WebsiteValidation(website) {
    if (!website || website.trim().length < 1) {
        return false;
    } else {
        return true;
    }
}