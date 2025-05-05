import { Alert } from "react-native";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";

export default function signUserOut(setIsLoggedIn) {
  signOut(auth)
    .then(() => {
      setIsLoggedIn(false);
    })
    .catch((error) => {
      Alert.alert("Something went wrong", "Sign out unsuccessful");
      console.error(error);
    });
}
