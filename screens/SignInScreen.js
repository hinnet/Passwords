import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import BackgroundColor from "./BackgroundColor";

export default function SignInScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const handleEmailLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error in signing in", error);
        Alert.alert("Error", "Invalid username or password");
      });
  };

  const passwordDisplay = () => {
    setSecure(!secure);
  };

  return (
    // Hides displayed keyboard if user presses anywhere outside of keyboard on the screen
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <BackgroundColor />
        <Text variant="displayMedium" style={{ marginBottom: 40 }}>
          Log in
        </Text>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.input}
        />
        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={secure}
          right={
            <TextInput.Icon
              icon={secure ? "eye-off" : "eye"}
              onPress={passwordDisplay}
            />
          }
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handleEmailLogin}
          style={styles.button}
          labelStyle={{ fontSize: 19 }}
        >
          Sign in
        </Button>
        <Text variant="titleMedium" style={{ marginTop: 40, marginBottom: 10 }}>
          Not registered yet?
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Sign up")}
          style={styles.button}
          labelStyle={{ fontSize: 19 }}
        >
          Sign up
        </Button>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    alignSelf: "stretch",
    marginVertical: 5,
    marginHorizontal: 30,
    height: 60,
  },
  button: {
    justifyContent: "center",
    width: "30%",
    margin: 15,
    borderRadius: 5,
    padding: 10,
  },
});
