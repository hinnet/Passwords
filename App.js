import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import LoginScreen from './screens/LoginScreen';
import { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <NavigationContainer>
        {isLoggedIn ? (
          <StackNavigator />
        ) : (
          <LoginScreen setIsLoggedIn={setIsLoggedIn} />
        )}
      </NavigationContainer>
  );
}