# Password Expo Go Application

This application is used for registered users to generate and store strong passwords.

## Technologies

- **React Native**: JavaScript library for building user interfaces.
- **Expo**: An open source platform that helps creating, deploying, and updating native apps with React.
- **React Native Paper**: React Native Paper is a cross-platform UI kit for Android and iOS.

### Data Management:
- **Firebase Realtime Database**: Used for storing and managing data.
- **React Native AsyncStorage**: Used to store user's authentication status (login state)locally on the device, allowing the app to keep the user logged in between app launches.

### Authentication:
- **Expo LocalAuthentication**: Used for biometric user authentication.
- **Firebase Authentication**: Used for user management.

### Encryption:
- **Expo Crypto**: For generating a unique salt value for each user.
- **CryptoJS**: For encrypting generated passwords.

### Testing:
- **Expo Go**: For running the mobile app on device and testing manually.
