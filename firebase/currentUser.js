import { auth } from "./firebaseConfig";

// https://firebase.google.com/docs/auth/web/manage-users#web_2

onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user

        return user.uid;
        // const uid = user.uid;
    } else {
        return null;
      // User is signed out
    }
});