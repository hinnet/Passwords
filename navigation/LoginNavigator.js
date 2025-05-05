/* This navigator is used before user signs in */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function LoginNavigator({ setIsLoggedIn }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign in">
        {(props) => <SignInScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Sign up" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
