import { useState } from 'react';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import LoginNavigator from './navigation/LoginNavigator';
import { useEffect } from 'react';
import { checkLogin } from './firebase/currentUser';
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
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        {isLoggedIn ? (
          <AppNavigator setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginNavigator setIsLoggedIn={setIsLoggedIn} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}

const customTheme = {
  ...MD3DarkTheme,
    "colors": {
      "primary": "rgb(79, 216, 235)",
      "onPrimary": "rgb(0, 54, 61)",
      "primaryContainer": "rgb(0, 79, 88)",
      "onPrimaryContainer": "rgb(151, 240, 255)",
      "secondary": "rgb(255, 176, 203)",
      "onSecondary": "rgb(100, 0, 55)",
      "secondaryContainer": "rgb(135, 21, 78)",
      "onSecondaryContainer": "rgb(255, 217, 227)",
      "tertiary": "rgb(255, 177, 200)",
      "onTertiary": "rgb(94, 17, 51)",
      "tertiaryContainer": "rgb(123, 41, 73)",
      "onTertiaryContainer": "rgb(255, 217, 226)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "rgb(25, 28, 29)",
      "onBackground": "rgb(225, 227, 227)",
      "surface": "rgb(25, 28, 29)",
      "onSurface": "rgb(225, 227, 227)",
      "surfaceVariant": "rgb(63, 72, 74)",
      "onSurfaceVariant": "rgb(191, 200, 202)",
      "outline": "rgb(137, 146, 148)",
      "outlineVariant": "rgb(63, 72, 74)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(225, 227, 227)",
      "inverseOnSurface": "rgb(46, 49, 50)",
      "inversePrimary": "rgb(0, 104, 116)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(28, 37, 39)",
        "level2": "rgb(29, 43, 46)",
        "level3": "rgb(31, 49, 52)",
        "level4": "rgb(32, 51, 54)",
        "level5": "rgb(33, 54, 58)"
      },
      "surfaceDisabled": "rgba(225, 227, 227, 0.12)",
      "onSurfaceDisabled": "rgba(225, 227, 227, 0.38)",
      "backdrop": "rgba(41, 50, 52, 0.4)"
    }
  }