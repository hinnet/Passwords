import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const initializeAuthListener = (setUser, setIsLoggedIn) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setIsLoggedIn(true);
        } else {
            await AsyncStorage.removeItem('user');
            setUser(null);
            setIsLoggedIn(false);
        }
    })
}

export async function getCurrentUser() {
    const currentUser = await AsyncStorage.getItem('user');
    if (!currentUser) {
        console.log('no stored user');
        return;
    }
    return (JSON.parse(currentUser));
}