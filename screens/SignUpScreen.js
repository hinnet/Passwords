import { Button, HelperText, TextInput } from "react-native-paper";
import {
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import EmailValidation from "../validation/input/EmailValidation";
import { PasswordValidation } from "../validation/input/PasswordValidation";
import { createUser } from "../firebase/createUser";
import BackgroundColor from "./BackgroundColor";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [secure, setSecure] = useState(true);

  const handleSignUp = async () => {
    const emailIsValid = EmailValidation(email);
    const passwordisValid = await PasswordValidation(password);

    setEmailError(!emailIsValid); // If email isn't valid, set error true
    setPasswordError(!passwordisValid); // Same with password

    if (!emailIsValid || !passwordisValid) {
      return;
    }
    createUser(email, password);
    navigation.navigate("Sign in");
  };

  const passwordDisplay = () => {
    setSecure(!secure);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <BackgroundColor />
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.input}
        />
        <HelperText style={styles.helperText} type="error" visible={emailError}>
          Enter valid email address.
        </HelperText>
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
        <HelperText
          style={styles.helperText}
          type="error"
          visible={passwordError}
        >
          Password must be at least 8 characters, with an uppercase letter,
          lowercase letter, and a numeric character.
        </HelperText>
        <Button
          mode="contained"
          onPress={handleSignUp}
          style={styles.button}
          labelStyle={{ fontSize: 16 }}
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
    height: 50,
    margin: 15,
    borderRadius: 5,
  },
  helperText: {
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 25,
    alignSelf: "flex-start",
  },
});
