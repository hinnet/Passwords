import { auth } from "./firebaseConfig";

export default function getCurrentUser() {
    const uid = auth.currentUser?.uid;
    
    if (uid) {
        return uid;
    } else {
        return null;
    }
};