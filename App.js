import { useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import LoginNavigator from './navigation/LoginNavigator';
import { useEffect } from 'react';
import { checkLogin, getCurrentUser } from './firebase/currentUser';
import { initializeAuthListener } from './firebase/currentUser';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    checkUser();

    // Set listener to track changes in user login state
    const unsubscribe = initializeAuthListener(setUser, setIsLoggedIn);
    // Return unsubscribe function to remove the listener when the component unmounts
    return unsubscribe;
  }, []);

  const checkUser = async () => {
    const storedUser = await checkLogin();
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  };

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