import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import BiometricSignIn from '../screens/BiometricSignIn';

// Returns React Native component named 'Stack'
const Stack = createNativeStackNavigator();

export default function LoginNavigator({ setIsLoggedIn }) {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Sign in">
                {props => <SignInScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Biometric sign in">
                {props => <BiometricSignIn {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Sign up" component={SignUpScreen} />
        </Stack.Navigator>
    );
}