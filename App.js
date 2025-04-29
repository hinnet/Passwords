import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { useState } from 'react';
import LoginNavigator from './navigation/LoginNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <PaperProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <StackNavigator setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginNavigator setIsLoggedIn={setIsLoggedIn} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};