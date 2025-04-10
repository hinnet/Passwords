import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from '../screens/IndexScreen';
import PasswordsScreen from '../screens/PasswordsScreen';

const Stack = createNativeStackNavigator();     // Returns React Native component named 'Stack'

export default function StackNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={IndexScreen} />
            <Stack.Screen name="Passwords" component={PasswordsScreen} />
        </Stack.Navigator>
    );
}
