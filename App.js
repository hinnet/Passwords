import { useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import LoginNavigator from './navigation/LoginNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <PaperProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <AppNavigator setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginNavigator setIsLoggedIn={setIsLoggedIn} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};