import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import PasswordsScreen from "../screens/PasswordsScreen";
import CreatePassword from "../screens/CreatePassword";
import EditPasswordScreen from "../screens/EditPasswordScreen";

const Stack = createNativeStackNavigator(); // Returns React Native component named 'Stack'

export default function AppNavigator({ setIsLoggedIn }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home">
        {(props) => <IndexScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Passwords" component={PasswordsScreen} />
      <Stack.Screen name="Create Password" component={CreatePassword} />
      <Stack.Screen name="Edit Password" component={EditPasswordScreen} />
    </Stack.Navigator>
  );
}
